import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from './page/pedido/pedido.component';
import { AdminComponent } from './page/admin/admin.component';
import { ItemComponent } from './page/admin/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    AdminComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
