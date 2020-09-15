import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarUsuarioCredencialesPageRoutingModule } from './registrar-usuario-credenciales-routing.module';

import { RegistrarUsuarioCredencialesPage } from './registrar-usuario-credenciales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarUsuarioCredencialesPageRoutingModule
  ],
  declarations: [RegistrarUsuarioCredencialesPage]
})
export class RegistrarUsuarioCredencialesPageModule {}
