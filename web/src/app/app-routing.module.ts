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

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
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
  { path: '**', redirectTo: '/' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
