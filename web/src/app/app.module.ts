import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PedidoComponent } from './page/pedido/pedido.component';
import { AdminComponent } from './page/admin/admin.component';
import { ItemComponent } from './page/admin/item/item.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './component/modal/modal.component';
import { ListaComponent } from './component/lista/lista.component';
import { CrudComponent } from './component/crud/crud.component';
import { CategoriaComponent } from './page/admin/categoria/categoria.component';
import { LandingComponent } from './page/landing/landing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PedidoComponent,
    HomeComponent,
    DetalleComponent,
    AdminComponent,
    ItemComponent,
    CategoriaComponent,
    FormularioComponent,
    ModalComponent,
    ListaComponent,
    CrudComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
