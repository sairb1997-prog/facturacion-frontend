import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  items = [
    { id: 1, name: 'Laptop Dell XPS', price: '$1,299', stock: 45, stockPct: 45 },
    { id: 2, name: 'iPhone 15 Pro', price: '$999', stock: 12, stockPct: 12 },
    { id: 3, name: 'Monitor Samsung 4K', price: '$549', stock: 78, stockPct: 78 },
    { id: 4, name: 'Teclado Mecánico', price: '$189', stock: 3, stockPct: 3 },
    { id: 5, name: 'Mouse Logitech MX', price: '$99', stock: 56, stockPct: 56 },
  ];

  sidebarCollapsed = false;
  activeSection = 'inventory';
  navItems = [
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