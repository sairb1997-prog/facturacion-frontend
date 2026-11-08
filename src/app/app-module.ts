import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
import { ButtonComponent } from './shared/components/button/button';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

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
    Dashboard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Infraestructura HTTP para los ApiClient de core.
    provideHttpClient(),
  ],
  bootstrap: [App]
})
export class AppModule { }
