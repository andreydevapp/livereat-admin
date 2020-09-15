import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPlatilloPageRoutingModule } from './crear-platillo-routing.module';

import { CrearPlatilloPage } from './crear-platillo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPlatilloPageRoutingModule
  ],
  declarations: [CrearPlatilloPage]
})
export class CrearPlatilloPageModule {}
