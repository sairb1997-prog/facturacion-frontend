import { Component, HostListener } from '@angular/core';

/**
 * Header exclusivo del flujo público (presentación de la app).
 * Vive dentro de pages/home — no se reutiliza en la plataforma:
 * al ingresar, el dashboard usa su propio header (perfil,
 * breadcrumb y salir).
 *
 * - El logo conduce a Inicio (ruta principal).
 * - El único botón visible es "Ingresar" (→ login).
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }
}
