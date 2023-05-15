import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './landing/page/start/start.component';
import { SharedModule } from './shared/shared.module';
import { LandingComponent } from './landing/page/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent, LandingComponent, StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
