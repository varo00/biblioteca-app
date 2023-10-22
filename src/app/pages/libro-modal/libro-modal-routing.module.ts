import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibroModalPage } from './libro-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LibroModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroModalPageRoutingModule {}
