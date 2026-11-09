import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

import type {
  AuthSession,
  LoginCredentials,
  User,
} from '../../../core/models/user.model';
import { ApiClient } from '../../../core/http/api-client.service';
import {
  clearSession as clearStoredSession,
  isValidSession,
  readSession,
  saveSession,
} from '../../../core/auth/session.storage';

/**
 * Dominio: autenticación y sesión.
 *
 * Encapsula login/logout y la persistencia de la sesión. Las páginas solo
 * conocen este servicio, nunca el mecanismo de almacenamiento ni la API.
 *
 * Endpoints del backend NestJS:
 *  - POST /auth/login    → AuthSession `{ token, user, createdAt }`
 *  - POST /auth/register → AuthSession
 *  - POST /auth/logout   → 204 No Content (revoca el refresh token en BD)
 */
@Injectable({ providedIn: 'root' })
export class AuthService extends ApiClient {
  protected override readonly resource: string = 'auth';

  /** Sesión persistida, o null si no hay login activo. */
  get session(): AuthSession | null {
    return readSession();
  }

  /** Usuario autenticado, o null si nadie ha iniciado sesión. */
  get currentUser(): User | null {
    return readSession()?.user ?? null;
  }

  /** Access token actual, o null. */
  get accessToken(): string | null {
    return readSession()?.token ?? null;
  }

  /** true si hay una sesión con token y dentro del TTL. */
  hasValidSession(): boolean {
    return isValidSession(readSession());
  }

  /**
   * Autentica contra el backend y **persiste la sesión** antes de devolverla.
   * Sin este paso el guard no puede validar la navegación a rutas protegidas.
   */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    try {
      const session = await firstValueFrom(
        this.post<LoginCredentials, AuthSession>('login', credentials),
      );
      saveSession(session);
      return session;
    } catch (error) {
      throw new Error(this.toErrorMessage(error, 'Credenciales incorrectas.'));
    }
  }

  /**
   * Revoca la sesión en el backend y elimina la copia local.
   *
   * Es importante suscribirse al `Observable` con `firstValueFrom`: un
   * `Observable` de `HttpClient` es perezoso y `await this.post(...)` no
   * dispara la petición HTTP. Por eso el request se envía antes de limpiar
   * el storage (el refresh token debe seguir disponible para revocarlo).
   */
  async logout(refreshToken?: string): Promise<void> {
    const token = refreshToken ?? readSession()?.refreshToken;

    try {
      if (token) {
        await firstValueFrom(
          this.post<{ refreshToken: string }, void>('logout', { refreshToken: token }),
        );
      }
    } catch {
      // Best effort: la sesión local se cierra aunque el backend falle.
    } finally {
      clearStoredSession();
    }
  }

  /** Limpia la sesión local (usado por el guard ante datos corruptos/expirados). */
  clearSession(): void {
    clearStoredSession();
  }

  /** Traduce la respuesta del backend a un mensaje entendible. */
  private toErrorMessage(error: unknown, fallback: string): string {
    const backendMessage = (
      error as { error?: { message?: string } } | null
    )?.error?.message;
    if (backendMessage) {
      return backendMessage;
    }
    const status = (error as { status?: number } | null)?.status;
    if (status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
    }
    return fallback;
  }
}
