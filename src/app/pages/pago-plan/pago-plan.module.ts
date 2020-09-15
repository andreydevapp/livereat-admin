import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoPlanPageRoutingModule } from './pago-plan-routing.module';

import { PagoPlanPage } from './pago-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPlanPageRoutingModule
  ],
  declarations: [PagoPlanPage]
})
export class PagoPlanPageModule {}
