import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './page/landing/landing.component';
import { PedidoComponent } from './page/pedido/pedido.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';
import { AdminComponent } from './page/admin/admin.component';
import { ItemComponent } from './page/admin/item/item.component';
import { CategoriaComponent } from './page/admin/categoria/categoria.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';

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
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'item', component: ItemComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
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
