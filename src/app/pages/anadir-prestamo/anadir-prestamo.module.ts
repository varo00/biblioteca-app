import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirActualizarPrestamoPageRoutingModule } from './anadir-prestamo-routing.module';

import { AnadirActualizarPrestamoPage } from './anadir-prestamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirActualizarPrestamoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AnadirActualizarPrestamoPage]
})
export class AnadirActualizarPrestamoPageModule {}
