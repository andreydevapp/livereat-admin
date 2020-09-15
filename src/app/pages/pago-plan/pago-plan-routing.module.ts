import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPlanPage } from './pago-plan.page';

const routes: Routes = [
  {
    path: '',
    component: PagoPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPlanPageRoutingModule {}
