import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePageRoutingModule } from './detalle-routing.module';

import { DetallePage } from './detalle.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetallePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetallePage]
})
export class DetallePageModule {}
