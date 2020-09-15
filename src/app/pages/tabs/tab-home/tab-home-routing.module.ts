import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabHomePage } from './tab-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',

  },
  {
    path: '',
    component: TabHomePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabHomePageRoutingModule {}
