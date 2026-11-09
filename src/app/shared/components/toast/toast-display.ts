import { Component, inject } from '@angular/core';
import { ToastService, ToastSeverity } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let toast of toasts(); trackBy: trackByFn" class="toast-notification toast-{{ toast.severity }}">
      <div class="toast-message">
        <span class="toast-icon">{{ icon(toast.severity) }}</span>
        <span>{{ toast.message }}</span>
      </div>
      <button type="button" class="toast-close" aria-label="Cerrar toast" (click)="remove(toast.id)">×</button>
    </div>
  `,
  styles: [`
    .toast-notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1060;
      padding: 0.875rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      min-width: 280px;
      max-width: 350px;
    }

    .toast-success {
      background: rgba(34, 197, 94, 0.9);
      color: white;
    }

    .toast-warning {
      background: rgba(251, 191, 36, 0.9);
      color: white;
    }

    .toast-error {
      background: rgba(239, 68, 68, 0.9);
      color: white;
    }

    .toast-info {
      background: rgba(59, 130, 246, 0.9);
      color: white;
    }

    .toast-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      margin-left: 0.75rem;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      padding: 0;
      line-height: 1;
    }

    .toast-close:hover {
      color: #fff;
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
export class ToastDisplayComponent {
  private readonly toastService = inject(ToastService);
  private readonly toasts = this.toastService.toasts$;

  icon(severity: ToastSeverity): string {
    switch (severity) {
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

  trackByFn(_: number, toast: { id: string }): string {
    return toast.id;
  }

  remove(id: string): void {
    this.toastService.remove(id);
  }
}