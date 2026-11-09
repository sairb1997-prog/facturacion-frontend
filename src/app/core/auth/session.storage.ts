import {
  readFromStorage,
  removeFromStorage,
  writeToStorage,
} from '../../shared/utils/storage.utils';
import type { AuthSession } from '../models/user.model';

/**
 * Clave única donde se persiste la sesión. Es la misma que documenta el
 * backend en `src/auth/auth.types.ts` (`factupro.session`).
 */
export const SESSION_STORAGE_KEY = 'factupro.session';

/** La sesión expira a las 12 h si el token no trae `exp` legible. */
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

/** Tolerancia de desfase de reloj entre servidor y navegador. */
const CLOCK_SKEW_MS = 5 * 60 * 1000;

/**
 * Lee el `exp` (segundos) del payload del JWT sin verificar la firma.
 * Solo sirve para UX/guard: la validación real la hace el backend.
 */
function tokenExpiresAt(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(globalThis.atob(base64));
    return typeof json.exp === 'number' ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** Lee la sesión persistida. Devuelve null si no existe o está corrupta. */
export function readSession(): AuthSession | null {
  return readFromStorage<AuthSession>(SESSION_STORAGE_KEY);
}

/** Persiste la sesión tras un login/registro exitoso. */
export function saveSession(session: AuthSession): void {
  writeToStorage(SESSION_STORAGE_KEY, session);
}

/** Elimina la sesión persistida. */
export function clearSession(): void {
  removeFromStorage(SESSION_STORAGE_KEY);
}

/**
 * Una sesión es válida si tiene token y no ha expirado.
 * Se prefiere el `exp` real del JWT; si no se puede leer, se usa el TTL.
 * Se usa tanto en el servicio como en el guard para que ambos coincidan.
 */
export function isValidSession(
  session: AuthSession | null,
  now = Date.now(),
): boolean {
  if (!session?.token || typeof session.createdAt !== 'number') {
    return false;
  }

  const expiresAt = tokenExpiresAt(session.token);
  if (expiresAt !== null) {
    return now < expiresAt + CLOCK_SKEW_MS;
  }

  const age = now - session.createdAt;
  return age > -CLOCK_SKEW_MS && age < SESSION_TTL_MS;
}
