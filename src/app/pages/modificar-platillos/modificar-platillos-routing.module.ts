import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPlatillosPage } from './modificar-platillos.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPlatillosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPlatillosPageRoutingModule {}
