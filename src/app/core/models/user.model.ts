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
  token: string;
  user: User;
  createdAt: number;
}
