import { Component, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-tab-administrar-platillos',
  templateUrl: './tab-administrar-platillos.page.html',
  styleUrls: ['./tab-administrar-platillos.page.scss'],
})
export class TabAdministrarPlatillosPage implements OnInit {

  @Input('header') header:any;

  private direccionScroll:any = [];
  buscar=false;

  private unsubscribe$ = new Subject<void>();

  constructor(private renderer:Renderer2,
    private scrollService:ScrollService,
    public userService:UserService) { 
      this.scrollService.getScroll().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
        this.direccionScroll = res;
        console.log(res);
        let direcion = this.direccionScroll.direccion;
        let header = document.getElementById('headerPlatillos');
        let tabs = document.getElementById('tabsPlatillos');
    
        if (direcion === 'subiendo') {
    
          this.renderer.setStyle(header,'margin-top',`-${header.clientHeight}px`); 
          this.renderer.setStyle(header,'transition',`margin-top 200ms`); 
    
          this.renderer.setStyle(tabs,'margin-top',`0px`); 
          this.renderer.setStyle(tabs,'transition',`margin-top 200ms`); 
    
        }else{
    
          this.renderer.setStyle(header,'margin-top','0'); 
          this.renderer.setStyle(header,'transition',`margin-top 200ms`);
    
          this.renderer.setStyle(tabs,'margin-top',`55px`); 
          this.renderer.setStyle(tabs,'transition',`margin-top 200ms`); 
    
        } 
      });
    }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

  tab_left_active = true;
  tab_rihgt_active = false;

  tab_activate(opc){

    if (opc === "mis-platillos") {
    
     this.tab_left_active = true; 
     this.tab_rihgt_active = false;

    }else{

      this.tab_rihgt_active = true;
      this.tab_left_active = false;

    }

  }

  activarBuscador(){
    if (this.buscar === false) {
      this.buscar=true;
    }else{
      this.buscar=false;
    }
    
  }

}
