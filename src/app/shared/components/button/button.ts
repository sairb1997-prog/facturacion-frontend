import { Component, HostListener, inject, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'high';

/**
 * Componente de botón reutilizable.
 *
 * El HOST es el propio botón: recibe las clases del design system
 * (.btn + variantes de app/shared/styles/components-styles.css) y
 * el contenido se proyecta con un único <ng-content>, de modo que
 * icono y texto siempre quedan como ítems de su fila flex.
 *
 * Uso:
 *   <app-button variant="primary" size="high" (action)="go()">Texto</app-button>
 *   <app-button variant="secondary" size="small" [routerLink]="['/login']">Ingresar</app-button>
 *   <app-button iconOnly variant="ghost">🚀</app-button>
 */
@Component({
  selector: 'app-button',
  standalone: false,
  template: '<ng-content />',
  host: {
    '[class]': 'classes',
    '[attr.aria-disabled]': 'disabled ? "true" : null',
    '[attr.aria-label]': 'label || null',
  },
})
export class ButtonComponent {
  /** Aspecto visual del botón. */
  @Input() variant: ButtonVariant = 'primary';
  /** Tamaño: small | medium | high (high es el más grande). */
  @Input() size: ButtonSize = 'medium';
  /** Sólo icono: el botón se vuelve cuadrado centrado. */
  @Input() iconOnly = false;
  /** Tipo nativo del botón (solo aplica cuando no es enlace). */
  @Input() type: 'button' | 'submit' = 'button';
  /** Deshabilita el botón. */
  @Input() disabled = false;
  /** Ocupa el ancho completo de su contenedor. */
  @Input() full = false;
  /** Etiqueta accesible opcional (aria-label). */
  @Input() label?: string;
  /** Si se define, el click navega a esta ruta. */
  @Input() routerLink?: string | any[];
  /** Se emite al pulsar el botón (mouse o teclado). */
  @Output() action = new EventEmitter<MouseEvent | KeyboardEvent>();

  private readonly router = inject(Router);

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  /** Modo enlace cuando hay ruta definida. */
  get isLink(): boolean {
    return this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
  }

  /** Composición de clases: base + variante + tamaño + ancho + icono. */
  get classes(): string {
    const parts = ['btn', `btn-${this.variant}`];
    if (this.size === 'small') {
      parts.push('btn-sm');
    } else if (this.size === 'high') {
      parts.push('btn-lg');
    }
    if (this.full) {
      parts.push('btn-full');
    }
    if (this.iconOnly) {
      parts.push('btn-icon');
    }
    return parts.join(' ');
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.isLink) {
      event.preventDefault();
      const link = this.routerLink as string | any[];
      if (typeof link === 'string') {
        this.router.navigateByUrl(link);
      } else {
        this.router.navigate(link);
      }
    } else if (this.type === 'submit') {
      // Dispara el submit del formulario contenedor cuando exista.
      const form = this.elementRef.nativeElement.closest('form');
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      }
    }
    this.action.emit(event as MouseEvent);
  }

  /** Accesibilidad: el host no es un <button> nativo, se escuchan las teclas. */
  @HostListener('keydown.enter', ['$event'])
  onEnter(event: Event): void {
    event.preventDefault();
    this.onClick(event);
  }

  @HostListener('keydown.space', ['$event'])
  onSpace(event: Event): void {
    event.preventDefault();
    this.onClick(event);
  }
}
