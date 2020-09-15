import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabChatPage } from './tab-chat.page';

const routes: Routes = [

  {
    path: '',
    redirectTo:'chat',

  },
  {
    path: '',
    component: TabChatPage,
    children:[
      {
        path: 'contactos',
        loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabChatPageRoutingModule {}
