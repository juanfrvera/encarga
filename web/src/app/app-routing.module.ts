import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './page/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./comerciante/comerciante.module').then(m => m.ComercianteModule)
  },
  // Para comercio real (ponerlo debajo para que no haya conflictos con paths estáticos)
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
