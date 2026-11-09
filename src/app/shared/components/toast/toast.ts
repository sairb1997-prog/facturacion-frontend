import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Componente de toast reutilizable para mostrar mensajes de feedback.
 *
 * Los toasts se gestionan desde fuera del componente mediante la entrada
 * `toast` y se emite el cierre cuando el usuario los interactúa o
 * expira el tiempo.
 *
 * Uso desde el componente padre:
 *   <app-toast [toast]="toastSignal()" (close)="handleClose($event)"></app-toast>
 *
 * Los tipos disponibles son: success, warning, error, info.
 * Cada tipo tiene su propio estilo visual definido en toast.css.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast-container"
      [ngClass]="{
        'toast-success': toast().type === 'success',
        'toast-warning': toast().type === 'warning',
        'toast-error': toast().type === 'error',
        'toast-info': toast().type === 'info'
      }"
    >
      <div class="toast-content">
        <span class="toast-icon">{{ icon }}</span>
        <span class="toast-message">{{ toast().message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1050;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .toast-content {
      padding: 0.875rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 250px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
    }

    .toast-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
    }

    /* Tip-specific styles */
    .toast-success {
      background: rgba(34, 197, 94, 0.15);
      border: 1px solid rgba(34, 197, 94, 0.5);
      color: #22c55e;
    }

    .toast-success .toast-icon {
      background: rgba(34, 197, 94, 0.3);
      border-radius: 0.25rem;
    }

    .toast-warning {
      background: rgba(251, 191, 36, 0.15);
      border: 1px solid rgba(251, 191, 36, 0.5);
      color: #fbbf24;
    }

    .toast-warning .toast-icon {
      background: rgba(251, 191, 36, 0.3);
      border-radius: 0.25rem;
    }

    .toast-error {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #ef4444;
    }

    .toast-error .toast-icon {
      background: rgba(239, 68, 68, 0.3);
      border-radius: 0.25rem;
    }

    .toast-info {
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.5);
      color: #3b82f6;
    }

    .toast-info .toast-icon {
      background: rgba(59, 130, 246, 0.3);
      border-radius: 0.25rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class ToastComponent {
  /** Datos del toast a mostrar */
  toast = input.required<Toast>();

  /** Emite cuando el usuario cierra el toast */
  @Output() close = new EventEmitter<string>();

  /** Icono según el tipo de toast */
  get icon(): string {
    switch (this.toast().type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '×';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }
}