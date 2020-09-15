import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarUsuarioCredencialesPage } from './registrar-usuario-credenciales.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarUsuarioCredencialesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarUsuarioCredencialesPageRoutingModule {}
