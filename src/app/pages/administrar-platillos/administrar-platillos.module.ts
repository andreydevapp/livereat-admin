import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarPlatillosPageRoutingModule } from './administrar-platillos-routing.module';

import { AdministrarPlatillosPage } from './administrar-platillos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPlatillosPageRoutingModule
  ],
  declarations: [AdministrarPlatillosPage]
})
export class AdministrarPlatillosPageModule {}
