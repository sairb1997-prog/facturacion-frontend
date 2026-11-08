import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  previewStats = [
    { icon: '💰', label: 'Ingresos', value: '$48,250', color: 'rgba(108,99,255,0.25)' },
    { icon: '📦', label: 'Productos', value: '1,284', color: 'rgba(0,212,170,0.25)' },
    { icon: '🧾', label: 'Facturas', value: '342', color: 'rgba(255,209,102,0.25)' },
  ];

  chartBars = [45, 70, 55, 90, 65, 80, 75, 95, 60, 85, 78, 100];

  features = [
    {
      icon: '🧾',
      title: 'Facturación Electrónica',
      description: 'Genera facturas profesionales en segundos. Cumple con los requisitos fiscales automáticamente.',
      gradient: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(108,99,255,0.1))'
    },
    {
      icon: '📦',
      title: 'Control de Inventario',
      description: 'Monitorea tu stock en tiempo real. Recibe alertas cuando los productos estén por agotarse.',
      gradient: 'linear-gradient(135deg, rgba(0,212,170,0.3), rgba(0,212,170,0.1))'
    },
    {
      icon: '👥',
      title: 'Gestión de Clientes',
      description: 'Mantén un registro completo de tus clientes. Historial de compras y datos de contacto.',
      gradient: 'linear-gradient(135deg, rgba(255,209,102,0.3), rgba(255,209,102,0.1))'
    },
    {
      icon: '📊',
      title: 'Reportes Inteligentes',
      description: 'Visualiza el rendimiento de tu negocio con gráficas interactivas y reportes detallados.',
      gradient: 'linear-gradient(135deg, rgba(255,77,109,0.3), rgba(255,77,109,0.1))'
    },
    {
      icon: '🔒',
      title: 'Seguridad Avanzada',
      description: 'Tus datos están protegidos con encriptación de nivel bancario. Acceso por roles.',
      gradient: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,170,0.1))'
    },
    {
      icon: '☁️',
      title: 'En la Nube',
      description: 'Accede desde cualquier dispositivo. Sincronización en tiempo real y backups automáticos.',
      gradient: 'linear-gradient(135deg, rgba(0,212,170,0.3), rgba(108,99,255,0.1))'
    }
  ];
}
