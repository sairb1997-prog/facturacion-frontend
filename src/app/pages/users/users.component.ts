import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  users = [
    { id: 1, initials: 'TC', name: 'TechCorp S.A.', email: 'contacto@techcorp.com', role: 'admin', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#6c63ff,#4e47d0)' },
    { id: 2, initials: 'MX', name: 'Inversiones MX', email: 'info@inversionesmx.com', role: 'operador', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#00d4aa,#00a884)' },
    { id: 3, initials: 'XZ', name: 'Distribuidora XYZ', email: 'ventas@distxyz.com', role: 'admin', status: 'VIP', statusClass: 'badge-primary', color: 'linear-gradient(135deg,#ffd166,#e6a000)' },
    { id: 4, initials: 'LA', name: 'Logística ABC', email: 'logistica@abc.com', role: 'operador', status: 'Moroso', statusClass: 'badge-danger', color: 'linear-gradient(135deg,#ff4d6d,#c91040)' },
    { id: 5, initials: 'CN', name: 'Comercial Norte', email: 'norte@comercial.com', role: 'admin', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#6c63ff,#00d4aa)' },
  ];

  sidebarCollapsed = false;
  activeSection = 'users';
  navItems = [
    { id: 'users', label: 'Usuarios', icon: '👥', badge: '' },
    { id: 'inventory', label: 'Inventario', icon: '📦', badge: '' },
    { id: 'overview', label: 'Resumen', icon: '🏠', badge: '' },
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  setSection(id: string): void {
    this.activeSection = id;
  }

  onAction(): void {
    console.log('Action for:', this.activeSection);
  }

  /** Cierra la sesión desde el pie del sidebar. */
  logout(): void {
    this.auth.logout().finally(() => this.router.navigate(['/home']));
  }
}