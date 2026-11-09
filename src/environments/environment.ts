/* Entorno base del frontend. Editar aquí los valores de desarrollo/publicación. */
export const environment = {
  production: false,
  /** URL base del backend, sin /api (el backend sirve rutas en la raíz). */
  apiBaseUrl: 'http://localhost:3000',
} as const;
