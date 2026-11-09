/**
 * Modelos del dominio de usuarios / sesión.
 * Viven en core porque son entidades del negocio que
 * trascienden cualquier página o módulo.
 */

/** Rol admitido por el sistema. */
export type UserRole = 'admin' | 'operador';

/** Usuario de la aplicación. */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** Credenciales para iniciar sesión. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Sesión autenticada persistida en storage. */
export interface AuthSession {
  /** Access token JWT (`Authorization: Bearer <token>`). */
  token: string;
  /**
   * Refresh token opaco que devuelve `POST /auth/login`. Se envía a
   * `POST /auth/logout` para borrar la sesión de `refresh_tokens`.
   * Es opcional para tolerar sesiones antiguas ya persistidas.
   */
  refreshToken?: string;
  user: User;
  /** Momento de creación de la sesión, en milisegundos (epoch Unix). */
  createdAt: number;
}
