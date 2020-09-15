import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAdministrarPlatillosPageRoutingModule } from './tab-administrar-platillos-routing.module';

import { TabAdministrarPlatillosPage } from './tab-administrar-platillos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAdministrarPlatillosPageRoutingModule
  ],
  declarations: [TabAdministrarPlatillosPage]
})
export class TabAdministrarPlatillosPageModule {}
