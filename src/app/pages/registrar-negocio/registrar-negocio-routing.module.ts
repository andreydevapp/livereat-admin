import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarNegocioPage } from './registrar-negocio.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarNegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarNegocioPageRoutingModule {}
