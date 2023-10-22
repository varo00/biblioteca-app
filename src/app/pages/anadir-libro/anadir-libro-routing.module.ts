import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirLibroPage } from './anadir-libro.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirLibroPageRoutingModule {}
