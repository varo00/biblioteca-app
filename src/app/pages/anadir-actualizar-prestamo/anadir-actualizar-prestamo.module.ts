import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirActualizarPrestamoPageRoutingModule } from './anadir-actualizar-prestamo-routing.module';

import { AnadirActualizarPrestamoPage } from './anadir-actualizar-prestamo.page';

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
