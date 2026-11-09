import { NgModule, provideBrowserGlobalErrorListeners, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { authInterceptor } from './core/http/auth.interceptor';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
import { ButtonComponent } from './shared/components/button/button';
import { ToastComponent } from './shared/components/toast/toast';
import { ToastDisplayComponent } from './shared/components/toast/toast-display';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { UsersComponent } from './pages/users/users.component';

/**
 * Módulo raíz. La infraestructura vive en core, los módulos de
 * dominio en pages y lo reutilizable en shared.
 */
@NgModule({
  declarations: [
    App,
    Navbar,
    ButtonComponent,
    Home,
    Login,
    Dashboard,
    InventoryComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToastComponent,
    ToastDisplayComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Infraestructura HTTP para los ApiClient de core.
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [App]
})
export class AppModule { }