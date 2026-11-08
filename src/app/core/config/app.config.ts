/**
 * Configuración global de la aplicación.
 * Toda la aplicación consume estos valores; nunca se hardcodean
 * URLs, nombres ni claves en las páginas ni en los servicios de dominio.
 */
export const APP_CONFIG = {
  name: 'FactuPro',
  version: '1.0.0',
  /** URL base para todas las llamadas HTTP de la API. */
  apiBaseUrl: '/api',
} as const;

export type AppConfig = typeof APP_CONFIG;
