/**
 * Acceso seguro a localStorage.
 * Nunca falla: devuelve null / no-op si el storage no está disponible
 * (modo privado, cookies bloqueadas, JSON inválido, etc.).
 */

export function readFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage no disponible: la app sigue funcionando en memoria */
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}
