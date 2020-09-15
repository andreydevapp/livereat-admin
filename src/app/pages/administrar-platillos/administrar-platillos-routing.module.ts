import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarPlatillosPage } from './administrar-platillos.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarPlatillosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarPlatillosPageRoutingModule {}
