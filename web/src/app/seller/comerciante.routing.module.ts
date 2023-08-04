import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './page/admin.component';
import { ItemComponent } from './page/item/item.component';
import { CategoryComponent } from './page/categories/categories.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './page/login/login.component';
import { ConfiguracionComponent } from './page/configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'items', component: ItemComponent },
      { path: 'categorias', component: CategoryComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercianteRoutingModule { }
