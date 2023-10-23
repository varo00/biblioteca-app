import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPwdPage } from './recuperar-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarPwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPwdPageRoutingModule {}
