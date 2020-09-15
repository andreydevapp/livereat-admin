import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabChatPageRoutingModule } from './tab-chat-routing.module';

import { TabChatPage } from './tab-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabChatPageRoutingModule
  ],
  declarations: [TabChatPage]
})
export class TabChatPageModule {}
