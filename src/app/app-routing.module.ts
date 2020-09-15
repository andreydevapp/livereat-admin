import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'platillos',
    loadChildren: () => import('./pages/platillos/platillos.module').then( m => m.PlatillosPageModule)
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
  },
  {
    path: 'registrar-negocio',
    loadChildren: () => import('./pages/registrar-negocio/registrar-negocio.module').then( m => m.RegistrarNegocioPageModule)
  },
  {
    path: 'tab-home',
    loadChildren: () => import('./pages/tabs/tab-home/tab-home.module').then( m => m.TabHomePageModule)
  },
  {
    path: 'tab-platillos',
    loadChildren: () => import('./pages/tabs/tab-administrar-platillos/tab-administrar-platillos.module').then( m => m.TabAdministrarPlatillosPageModule)
  },
  {
    path: 'modificar-platillos/:id',
    loadChildren: () => import('./pages/modificar-platillos/modificar-platillos.module').then( m => m.ModificarPlatillosPageModule)
  },
  {
    path: 'registrar-usuario-credenciales/:id',
    loadChildren: () => import('./pages/registrar-usuario-credenciales/registrar-usuario-credenciales.module').then( m => m.RegistrarUsuarioCredencialesPageModule)
  },
  {
    path: 'tab-chat',
    loadChildren: () => import('./pages/tabs/tab-chat/tab-chat.module').then( m => m.TabChatPageModule)
  },
  {
    path: 'mensajes/:id',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'planes',
    loadChildren: () => import('./pages/planes/planes.module').then( m => m.PlanesPageModule)
  },
  {
    path: 'pago-plan',
    loadChildren: () => import('./pages/pago-plan/pago-plan.module').then( m => m.PagoPlanPageModule)
  },
  {
    path: 'pay-method',
    loadChildren: () => import('./pages/pay-method/pay-method.module').then( m => m.PayMethodPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
