import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './page/landing/landing.component';
import { PedidoComponent } from './page/pedido/pedido.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  // Demo
  {
    path: 'pedido',
    component: PedidoComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'detalle', component: DetalleComponent }
    ]
  },
  // Para comercio real (ponerlo debajo para que no haya conflictos con paths estáticos)
  {
    path: ':comercio',
    component: PedidoComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'detalle', component: DetalleComponent }
    ]
  },
  { path: '**', redirectTo: '/' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
