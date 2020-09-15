import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { MenuController } from '@ionic/angular';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-tab-chat',
  templateUrl: './tab-chat.page.html',
  styleUrls: ['./tab-chat.page.scss'],
})
export class TabChatPage implements OnInit {

  @Input('headerChat') header:any;

  direccionScroll:any = [];

  active = 'Chat';

  constructor(
    private scrollService:ScrollService,
    private renderer:Renderer2
    ) {
      this.scrollService.getScrollChat().subscribe(res => {
        this.direccionScroll = res;
        let direcion = this.direccionScroll.direccion;
        let header = document.getElementById('headerChat');
        let tabs = document.getElementById('tabsChat');
  
        if (direcion === 'subiendo') {
  
          this.renderer.setStyle(header,'margin-top',`-${header.clientHeight}px`); 
          this.renderer.setStyle(header,'transition',`margin-top 400ms`); 
  
          this.renderer.setStyle(tabs,'margin-top',`0px`); 
          this.renderer.setStyle(tabs,'transition',`margin-top 400ms`); 
  
        }else{
  
          this.renderer.setStyle(header,'margin-top','0'); 
          this.renderer.setStyle(header,'transition',`margin-top 400ms`);
  
          this.renderer.setStyle(tabs,'margin-top',`55px`); 
          this.renderer.setStyle(tabs,'transition',`margin-top 400ms`); 
  
        }
      });

    }

  ngOnInit() {
    
  }

  activar(active){
    this.active = active;
  }


}
