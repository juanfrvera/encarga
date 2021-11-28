import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PedidoComponent } from './page/pedido/pedido.component';
import { HomeComponent } from './page/pedido/home/home.component';
import { DetalleComponent } from './page/pedido/detalle/detalle.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './page/landing/landing.component';
import { LoginComponent } from './comerciante/page/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UrlComercioInterceptor } from './interceptor/url-comercio.interceptor';
import { mockInterceptorProvider } from './interceptor/mock.interceptor';
import { ComercianteModule } from './comerciante/comerciante.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PedidoComponent,
    HomeComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // App
    ComercianteModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlComercioInterceptor,
      multi: true
    },
    mockInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
