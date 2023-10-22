import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirLibroPageRoutingModule } from './anadir-libro-routing.module';

import { AnadirLibroPage } from './anadir-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirLibroPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AnadirLibroPage]
})
export class AnadirLibroPageModule {}
