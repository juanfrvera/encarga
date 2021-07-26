import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './page/landing/landing.component';
import { PedidoComponent } from './page/pedido/pedido.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';
import { AdminComponent } from './page/admin/admin.component';
import { ItemComponent } from './page/admin/item/item.component';
import { CategoriaComponent } from './page/admin/categoria/categoria.component';

const routes: Routes = [
  {
    path: '',
    //component: LandingComponent,
    redirectTo: '/pedido',
    pathMatch: 'full'
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
      { path: '', component: ItemComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'item', redirectTo: '' }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
