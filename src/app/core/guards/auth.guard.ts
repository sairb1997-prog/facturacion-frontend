import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toast/toast.service';

/**
 * Protege las rutas privadas (`dashboard`, `inventory`, `users`).
 *
 * Usa la misma fuente de verdad que `AuthService` (el storage centralizado),
 * de modo que el login, el guard y el interceptor no pueden desincronizarse.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly toastService: ToastService,
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.hasValidSession()) {
      return true;
    }

    // Si había una sesión pero ya no es válida (expirada/corrupta), la limpiamos.
    if (this.auth.session) {
      this.auth.clearSession();
    }

    this.toastService.error(
      'Tu sesión expiró o no has iniciado sesión. Por favor, inicia sesión nuevamente.',
      5000,
    );

    return this.router.createUrlTree(['/login']);
  }
}
