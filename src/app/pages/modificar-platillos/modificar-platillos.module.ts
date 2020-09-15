import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPlatillosPageRoutingModule } from './modificar-platillos-routing.module';

import { ModificarPlatillosPage } from './modificar-platillos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPlatillosPageRoutingModule
  ],
  declarations: [ModificarPlatillosPage]
})
export class ModificarPlatillosPageModule {}
