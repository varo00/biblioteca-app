import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirActualizarPrestamoPage } from './anadir-actualizar-prestamo.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirActualizarPrestamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirActualizarPrestamoPageRoutingModule {}
