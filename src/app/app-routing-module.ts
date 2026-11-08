import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

const routes: Routes = [
  { path: '',        redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',      component: Home },
  { path: 'login',     component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: '**',      redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
