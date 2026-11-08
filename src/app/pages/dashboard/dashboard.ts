import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  sidebarCollapsed = false;
  activeSection = 'overview';
  currentMonth = new Date().getMonth();

  navItems = [
    { id: 'overview',   label: 'Resumen',     icon: '🏠', badge: '' },
    { id: 'inventory',  label: 'Inventario',  icon: '📦', badge: '12' },
    { id: 'invoices',   label: 'Facturas',    icon: '🧾', badge: '3' },
    { id: 'clients',    label: 'Clientes',    icon: '👥', badge: '' },
    { id: 'reports',    label: 'Reportes',    icon: '📊', badge: '' },
  ];

  sections: Record<string, { title: string; subtitle: string; action: string }> = {
    overview:  { title: 'Resumen General', subtitle: 'Panorama completo de tu negocio', action: 'Nueva factura' },
    inventory: { title: 'Inventario',      subtitle: 'Gestiona tus productos y stock',  action: 'Añadir producto' },
    invoices:  { title: 'Facturas',        subtitle: 'Historial de facturación',        action: 'Nueva factura' },
    clients:   { title: 'Clientes',        subtitle: 'Directorio de clientes',          action: 'Añadir cliente' },
    reports:   { title: 'Reportes',        subtitle: 'Análisis y métricas',             action: 'Exportar' },
  };

  get currentSection() {
    return this.sections[this.activeSection] || this.sections['overview'];
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  setSection(id: string): void {
    this.activeSection = id;
  }

  onAction(): void {
    console.log('Action for:', this.activeSection);
  }

  /** Cierra la sesión y regresa a la presentación (home). */
  exitPlatform(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  // Overview stats
  stats = [
    { icon: '💰', label: 'Ingresos Totales',  value: '$48,250', change: '12.5% este mes', positive: true,  bg: 'rgba(108,99,255,0.15)' },
    { icon: '🧾', label: 'Facturas Emitidas', value: '342',     change: '8 esta semana',  positive: true,  bg: 'rgba(0,212,170,0.15)' },
    { icon: '📦', label: 'Productos en Stock', value: '1,284',  change: '23 por agotarse', positive: false, bg: 'rgba(255,209,102,0.15)' },
    { icon: '👥', label: 'Clientes Activos',   value: '186',    change: '5 nuevos hoy',   positive: true,  bg: 'rgba(255,77,109,0.15)' },
  ];

  months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  salesData = [45, 68, 55, 72, 60, 88, 75, 95, 62, 80, 70, 100];

  recentActivity = [
    { text: 'Nueva factura #F-342 creada', time: 'hace 5 min', color: 'var(--primary)' },
    { text: 'Producto "Laptop Dell" stock bajo', time: 'hace 18 min', color: 'var(--warning)' },
    { text: 'Cliente "TechCorp" registrado', time: 'hace 1 h', color: 'var(--accent)' },
    { text: 'Pago recibido $2,400', time: 'hace 2 h', color: 'var(--success)' },
    { text: 'Factura #F-341 vencida', time: 'hace 3 h', color: 'var(--danger)' },
    { text: 'Inventario actualizado (15 items)', time: 'hace 5 h', color: 'var(--primary-light)' },
  ];

  recentInvoices = [
    { id: 'F-342', client: 'TechCorp S.A.',    date: '17/10/2026', amount: '$3,200', status: 'Pagada',   statusClass: 'badge-accent' },
    { id: 'F-341', client: 'Inversiones MX',   date: '16/10/2026', amount: '$1,850', status: 'Pendiente',statusClass: 'badge-warning' },
    { id: 'F-340', client: 'Distribuidora XYZ', date: '15/10/2026', amount: '$5,400', status: 'Pagada',  statusClass: 'badge-accent' },
    { id: 'F-339', client: 'Logística ABC',    date: '14/10/2026', amount: '$980',   status: 'Vencida',  statusClass: 'badge-danger' },
    { id: 'F-338', client: 'Comercial Norte',  date: '13/10/2026', amount: '$2,100', status: 'Pagada',   statusClass: 'badge-accent' },
  ];

  // Inventory
  products = [
    { icon: '💻', name: 'Laptop Dell XPS',    price: '$1,299', stock: 45, stockPct: 45, stockLabel: 'En Stock',     stockClass: 'badge-accent',   barColor: 'var(--accent)' },
    { icon: '📱', name: 'iPhone 15 Pro',       price: '$999',   stock: 12, stockPct: 12, stockLabel: 'Stock Bajo',   stockClass: 'badge-warning',  barColor: 'var(--warning)' },
    { icon: '🖥️', name: 'Monitor Samsung 4K', price: '$549',   stock: 78, stockPct: 78, stockLabel: 'En Stock',     stockClass: 'badge-accent',   barColor: 'var(--accent)' },
    { icon: '⌨️', name: 'Teclado Mecánico',   price: '$189',   stock: 3,  stockPct: 3,  stockLabel: 'Agotado',      stockClass: 'badge-danger',   barColor: 'var(--danger)' },
    { icon: '🖱️', name: 'Mouse Logitech MX', price: '$99',    stock: 56, stockPct: 56, stockLabel: 'En Stock',     stockClass: 'badge-accent',   barColor: 'var(--accent)' },
    { icon: '🎧', name: 'Auriculares Sony',    price: '$349',   stock: 22, stockPct: 22, stockLabel: 'Stock Bajo',   stockClass: 'badge-warning',  barColor: 'var(--warning)' },
  ];

  // Clients
  clients = [
    { initials: 'TC', name: 'TechCorp S.A.',      email: 'contacto@techcorp.com', invoices: 28, total: '$42,800', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#6c63ff,#4e47d0)' },
    { initials: 'MX', name: 'Inversiones MX',     email: 'info@inversionesmx.com', invoices: 15, total: '$21,500', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#00d4aa,#00a884)' },
    { initials: 'XZ', name: 'Distribuidora XYZ',  email: 'ventas@distxyz.com', invoices: 42, total: '$68,200', status: 'VIP', statusClass: 'badge-primary', color: 'linear-gradient(135deg,#ffd166,#e6a000)' },
    { initials: 'LA', name: 'Logística ABC',       email: 'logistica@abc.com', invoices: 8, total: '$9,800', status: 'Moroso', statusClass: 'badge-danger', color: 'linear-gradient(135deg,#ff4d6d,#c91040)' },
    { initials: 'CN', name: 'Comercial Norte',     email: 'norte@comercial.com', invoices: 19, total: '$29,400', status: 'Activo', statusClass: 'badge-accent', color: 'linear-gradient(135deg,#6c63ff,#00d4aa)' },
  ];
}
