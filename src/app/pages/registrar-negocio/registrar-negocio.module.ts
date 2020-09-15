import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarNegocioPageRoutingModule } from './registrar-negocio-routing.module';

import { RegistrarNegocioPage } from './registrar-negocio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarNegocioPageRoutingModule
  ],
  declarations: [RegistrarNegocioPage]
})
export class RegistrarNegocioPageModule {}
