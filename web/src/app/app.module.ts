import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from './page/pedido/pedido.component';
import { AdminComponent } from './page/admin/admin.component';
import { ItemComponent } from './page/admin/item/item.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './component/modal/modal.component';
import { ListaComponent } from './component/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    HomeComponent,
    DetalleComponent,
    AdminComponent,
    ItemComponent,
    FormularioComponent,
    ModalComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
