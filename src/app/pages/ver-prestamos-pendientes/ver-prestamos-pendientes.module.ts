import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerPrestamosPendientesPageRoutingModule } from './ver-prestamos-pendientes-routing.module';

import { VerPrestamosPendientesPage } from './ver-prestamos-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPrestamosPendientesPageRoutingModule,
  ],
  declarations: [VerPrestamosPendientesPage]
})
export class VerPrestamosPendientesPageModule {}
