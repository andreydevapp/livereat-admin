import { Component, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { WebsocketService } from 'src/app/services/websocket.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ChatService } from 'src/app/services/chat.service';
import { PlatillosService } from 'src/app/services/platillos.service';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { CantidadesService } from 'src/app/services/cantidades.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {

  @Input('header') header:any;

  private direccionScroll:any = [];

  public user:any;

  public datosCargados = false;

  public URI = environment.URI;

  private unsubscribe$ = new Subject<void>();

  pedidosCont = 0;

  pedidos:any = [];

  mensajesSinVer = 0;

  cantiPedidos:any = [];

  showMenu = false;

  constructor(private renderer:Renderer2,
    private scrollService:ScrollService,
    public userService:UserService,
    private wsService:WebsocketService,
    private pedidosService:PedidosService,
    private chatService:ChatService,
    private cantidadesService:CantidadesService,
    private herramientas:HerramientasService,
    private menu: MenuController,
    private router:Router
    ) { 
      this.scrollService.getScroll().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
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


  async ngOnInit() {

    const storage = await this.userService.cargarStorage();

    if (storage) {
      this.datosCargados = true;
      this.userService.sendloadData(true);
    }

    //obtiene los mensajes cuando se inicia la app
    this.chatService.getChatWsReceptorPaginaHome().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      const cantidad:any = res;
      this.mensajesSinVer = cantidad.res;
      console.log(this.mensajesSinVer);
    },err => {
      console.log(err)
    });


    //obtiene en tiempo real
    this.wsService.obtenerPedidos().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(async res => {
      if (this.cantiPedidos.res !== "forbiden") {
        this.pedidos = res;
      this.pedidosCont = this.pedidos.length;
      }else{
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
      }
      
    },err => {
      console.log(err);
    });

   this.obtenerCantidades();

  }

  openMenu() {
    if (!this.showMenu) {
      this.menu.enable(true, 'menu');
      this.menu.open('menu');
      this.showMenu = true;
    }else{
      this.menu.enable(true, 'menu');
      this.menu.close('menu');
      this.showMenu = false;
    }    
  }

  async obtenerCantidades(){
    await this.herramientas.presentLoading();
    console.log("obtener las cantidades");
    this.cantidadesService.obtenerCantiPedidosPlatillos().pipe(takeUntil(this.unsubscribe$)).subscribe(
      async res => {
        console.log(res);
        this.herramientas.dismissLoading();
        const data:any = res;
        if (data.authorization !== "forbiden") {
          this.cantiPedidos = res;
          this.cantidadesService.cargarCantiPedidos(data.pedidos.noVistos);
          this.cantidadesService.cargarCantiPlatillos(data.platillos.platillos);
          this.cantidadesService.cargarCantiVentas(data.ventas.ventas);
        }else{
          await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
        }
      },
      err => {
        this.herramientas.dismissLoading();
      }
    )

  
  }

  bajarScroll() {
    this.scrollService.sendScroll('bajando');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
