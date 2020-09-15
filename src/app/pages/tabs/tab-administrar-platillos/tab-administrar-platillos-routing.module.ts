import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdministrarPlatillosPage } from './tab-administrar-platillos.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'mis-platillos',

  },
  {
    path: '',
    component: TabAdministrarPlatillosPage,
    children: [
      {
        path: 'crear-platillo',
        loadChildren: () => import('./crear-platillo/crear-platillo.module').then( m => m.CrearPlatilloPageModule)
      },
      {
        path: 'mis-platillos',
        loadChildren: () => import('./mis-platillos/mis-platillos.module').then( m => m.MisPlatillosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdministrarPlatillosPageRoutingModule {}
