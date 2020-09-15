import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPlatilloPage } from './crear-platillo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPlatilloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPlatilloPageRoutingModule {}
