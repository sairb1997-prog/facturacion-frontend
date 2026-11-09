import { HttpInterceptorFn } from '@angular/common/http';

import { readSession } from '../auth/session.storage';

/**
 * Adjunta el access token de la sesión a cada petición HTTP.
 *
 * No hay dependencia con `AuthService` a propósito: el servicio extiende
 * `ApiClient` (que usa `HttpClient`), así que inyectarlo aquí crearía un ciclo
 * de DI. Leer la sesión del storage evita ese ciclo y mantiene el interceptor
 * sin estado.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = readSession()?.token;

  if (!token || req.headers.has('Authorization')) {
    return next(req);
  }

  return next(
    req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }),
  );
};
