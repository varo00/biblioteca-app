import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarPwdPageRoutingModule } from './recuperar-pwd-routing.module';

import { RecuperarPwdPage } from './recuperar-pwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPwdPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RecuperarPwdPage]
})
export class RecuperarPwdPageModule {}
