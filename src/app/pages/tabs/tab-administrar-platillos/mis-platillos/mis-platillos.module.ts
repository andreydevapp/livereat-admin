import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPlatillosPageRoutingModule } from './mis-platillos-routing.module';

import { MisPlatillosPage } from './mis-platillos.page';
import { PopoverInfoComponent } from '../../../../components/popover-info/popover-info.component';
import { PopoverFiltroComponent } from '../../../../components/popover-filtro/popover-filtro.component';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  entryComponents:[
    PopoverInfoComponent,
    PopoverFiltroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisPlatillosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisPlatillosPage]
})
export class MisPlatillosPageModule {}
