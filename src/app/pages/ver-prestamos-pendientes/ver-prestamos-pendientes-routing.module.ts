import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerPrestamosPendientesPage } from './ver-prestamos-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: VerPrestamosPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerPrestamosPendientesPageRoutingModule {}
