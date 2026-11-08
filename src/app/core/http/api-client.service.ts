import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';

import { APP_CONFIG } from '../config/app.config';

/**
 * Cliente base de infraestructura HTTP.
 *
 * Los servicios específicos de cada dominio (auth, inventario, facturación...)
 * extienden esta clase y delegan en ella el manejo de la URL base,
 * los verbos HTTP y la construcción de parámetros.
 */
export abstract class ApiClient {
  /** HTTP inyectado de forma explícita: los hijos no necesitan pasarlo. */
  protected readonly http: HttpClient = inject(HttpClient);

  /** Prefijo de todos los endpoints que servirá este cliente. */
  protected abstract readonly resource: string;

  /**
   * GET /<resource>[path]
   */
  get<T>(path = '', params?: Record<string, string>) {
    return this.http.get<T>(this.buildUrl(path), { params: this.toParams(params) });
  }

  /**
   * POST /<resource>[path] con cuerpo JSON.
   */
  post<TBody, TResponse>(path = '', body?: TBody) {
    return this.http.post<TResponse>(this.buildUrl(path), body ?? null);
  }

  /**
   * PUT /<resource>[path] con cuerpo JSON.
   */
  put<TBody, TResponse>(path = '', body?: TBody) {
    return this.http.put<TResponse>(this.buildUrl(path), body ?? null);
  }

  /**
   * DELETE /<resource>[path]
   */
  delete<T>(path = '') {
    return this.http.delete<T>(this.buildUrl(path));
  }

  private buildUrl(path: string): string {
    const base = APP_CONFIG.apiBaseUrl.replace(/\/+$/, '');
    const suffix = path.replace(/^\/+/, '');
    return suffix ? `${base}/${this.resource}/${suffix}` : `${base}/${this.resource}`;
  }

  private toParams(params?: Record<string, string>): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      httpParams = httpParams.set(key, value);
    }
    return httpParams;
  }
}
