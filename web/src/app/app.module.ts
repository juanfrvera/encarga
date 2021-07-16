import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { DetalleComponent } from './page/detalle/detalle.component';
import { AdminComponent } from './page/admin/admin.component';
import { LandingComponent } from './page/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetalleComponent,
    AdminComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
