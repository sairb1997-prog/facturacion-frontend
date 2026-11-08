import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  loginFeatures = [
    'Facturación electrónica en segundos',
    'Control de inventario en tiempo real',
    'Dashboard con métricas clave',
    'Reportes exportables en PDF y Excel'
  ];

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
      return;
    }
    this.isLoading = true;
    // Simulate auth
    setTimeout(() => {
      this.isLoading = false;
      if (this.email === 'admin@factupro.com' && this.password === 'admin123') {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Usa la cuenta demo.';
      }
    }, 1500);
  }

  loginDemo(): void {
    this.email = 'admin@factupro.com';
    this.password = 'admin123';
    this.onLogin();
  }
}
