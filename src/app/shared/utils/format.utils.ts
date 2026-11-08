/**
 * Utilidades de formato (dominio: presentación de datos).
 * Reutilizables en cualquier página o componente.
 */

/** Formatea un número como moneda, ej: 1250.5 → "$1,250.50". */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

/** Formatea una fecha como dd/mm/yyyy. */
export function formatDate(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Devuelve las iniciales de un nombre, ej: "TechCorp S.A." → "TS". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
