import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverInfoComponent } from './popover-info/popover-info.component';
import { PopoverFiltroComponent } from './popover-filtro/popover-filtro.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PopoverInfoComponent,
    PopoverFiltroComponent
  ],
  exports:[
    PopoverInfoComponent,
    PopoverFiltroComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
