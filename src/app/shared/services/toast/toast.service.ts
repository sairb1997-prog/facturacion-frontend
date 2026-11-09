import { Injectable, signal } from '@angular/core';

export type ToastSeverity = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  severity: ToastSeverity;
  message: string;
  duration?: number;
}

const TOAST_DURATION = 5000;

/**
 * Servicio de toasts global - muestra mensajes temporales en la esquina inferior derecha.
 * Los toasts se eliminan automáticamente después del tiempo de duración.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);

  /** Obtener la señal de toasts para que los componentes padres puedan suscribirse. */
  get toasts$() {
    return this.toasts.asReadonly();
  }

  /** Mostrar un toast con el tipo y mensaje especificados. */
  show(toast: Omit<Toast, 'id'>): string {
    const id = Date.now().toString() + Math.random().toString(36).substr(2);
    const item: Toast = { id, ...toast };
    this.toasts.update((current) => [...current, item]);
    // Auto-remover después de la duración
    setTimeout(() => {
      this.remove(id);
    }, toast.duration || TOAST_DURATION);
    return id;
  }

  /** Remover un toast por su ID. */
  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  /** Toast de éxito. */
  success(message: string, duration?: number): string {
    return this.show({ severity: 'success', message, duration });
  }

  /** Toast de advertencia. */
  warning(message: string, duration?: number): string {
    return this.show({ severity: 'warning', message, duration });
  }

  /** Toast de error. */
  error(message: string, duration?: number): string {
    return this.show({ severity: 'error', message, duration });
  }

  /** Toast de información. */
  info(message: string, duration?: number): string {
    return this.show({ severity: 'info', message, duration });
  }
}