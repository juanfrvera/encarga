import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { DetalleComponent } from './page/detalle/detalle.component';
import { HomeComponent } from './page/home/home.component';
import { LandingComponent } from './page/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'detalle',
    component: DetalleComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
