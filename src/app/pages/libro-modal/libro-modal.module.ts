import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibroModalPageRoutingModule } from './libro-modal-routing.module';

import { LibroModalPage } from './libro-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibroModalPageRoutingModule
  ],
  declarations: [LibroModalPage]
})
export class LibroModalPageModule {}
