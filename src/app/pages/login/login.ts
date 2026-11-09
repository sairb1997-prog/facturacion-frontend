import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastService } from '../../shared/services/toast/toast.service';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastService,
  ) {}

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
    this.auth
      .login({ email: this.email, password: this.password })
      .then((session) => {
        this.toast.success(`Bienvenido, ${session.user.name}.`, 3000);
        return this.router.navigate(['/dashboard']);
      })
      .catch((error: Error) => {
        this.errorMessage = error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  
}
