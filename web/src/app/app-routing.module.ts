import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/page/landing/landing.component';
import { StartComponent } from './landing/page/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./seller/comerciante.module').then(m => m.ComercianteModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  // Para comercio real (ponerlo debajo para que no haya conflictos con paths estáticos)
  // Es importante repetir para que funcione
  {
    path: ':urlComercio',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
