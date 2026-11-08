import { Injectable, signal } from '@angular/core';

import { APP_CONFIG } from '../../../core/config/app.config';
import type { AuthSession, LoginCredentials, User } from '../../../core/models/user.model';
import { readFromStorage, removeFromStorage, writeToStorage } from '../../utils/storage.utils';

/** Simula la latencia de red hasta que exista backend real. */
const SIMULATED_LATENCY_MS = 1500;
/** La sesión demo expira a las 12 horas. */
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

/**
 * Dominio: autenticación y sesión.
 * Encapsula todo lo relativo a login/logout; las páginas solo conocen
 * este servicio, nunca el mecanismo de persistencia ni la API.
 *
 * Cuando exista backend real, la llamada HTTP se realizará a través
 * del ApiClient de core/http; esta interfaz pública no cambia.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly STORAGE_KEY = `${APP_CONFIG.name.toLowerCase()}.session`;

  /** Credenciales de la cuenta demo mientras no exista backend real. */
  private static readonly DEMO_CREDENTIALS: LoginCredentials = {
    email: 'admin@factupro.com',
    password: 'admin123',
  };
  private static readonly DEMO_USER: User = {
    id: 'usr-demo',
    name: 'Admin',
    email: AuthService.DEMO_CREDENTIALS.email,
    role: 'admin',
  };

  /** Sesión actual (null si no hay nadie logueado o expiró). */
  private readonly sessionSignal = signal<AuthSession | null>(this.readSession());
  readonly session = this.sessionSignal.asReadonly();

  get currentUser(): User | null {
    return this.sessionSignal()?.user ?? null;
  }

  /** Autentica al usuario. Rechaza con Error si las credenciales son inválidas. */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

    const valid =
      credentials.email === AuthService.DEMO_CREDENTIALS.email &&
      credentials.password === AuthService.DEMO_CREDENTIALS.password;
    if (!valid) {
      throw new Error('Credenciales incorrectas. Usa la cuenta demo.');
    }

    const session: AuthSession = {
      token: `demo-${Date.now()}`,
      user: AuthService.DEMO_USER,
      createdAt: Date.now(),
    };
    writeToStorage(AuthService.STORAGE_KEY, session);
    this.sessionSignal.set(session);
    return session;
  }

  /** Cierra la sesión actual. */
  logout(): void {
    removeFromStorage(AuthService.STORAGE_KEY);
    this.sessionSignal.set(null);
  }

  /** Recupera la sesión persistida; devuelve null si no existe o expiró. */
  private readSession(): AuthSession | null {
    const session = readFromStorage<AuthSession>(AuthService.STORAGE_KEY);
    if (!session) {
      return null;
    }
    return Date.now() - session.createdAt > SESSION_TTL_MS ? null : session;
  }
}
