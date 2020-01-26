import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @Input('header') header:any;

  direccionScroll:any = [];

  constructor( private renderer:Renderer2,
    private scrollService:ScrollService) {

    this.scrollService.getScroll().subscribe(res => {
      this.direccionScroll = res;
      console.log(res);
      let direcion = this.direccionScroll.direccion;
      let header = document.getElementById('header');
      let tabs = document.getElementById('tabs');

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

  tab_activate(opc){

    const homeElem = document.getElementById('tab-home');
    const chatElem = document.getElementById('tab-chat');

    if (opc === "home") {
      
      homeElem.classList.add('tab-btn-activated');
      chatElem.classList.remove('tab-btn-activated');

    }else{

      homeElem.classList.add('tab-btn-activated');
      chatElem.classList.remove('tab-btn-activated');

    }

  }

}
