import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisPlatillosPage } from './mis-platillos.page';

const routes: Routes = [
  {
    path: '',
    component: MisPlatillosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisPlatillosPageRoutingModule {}
