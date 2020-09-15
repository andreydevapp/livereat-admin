import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment.prod';
import { PlatillosService } from 'src/app/services/platillos.service';
import { takeUntil } from 'rxjs/operators';
import { PedidosService } from 'src/app/services/pedidos.service';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { LoadingController } from '@ionic/angular';
import { CantidadesService } from 'src/app/services/cantidades.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public userService:UserService,
    private scrollService:ScrollService,
    private router:Router,
    private platillosServices:PlatillosService,
    private pedidosService:PedidosService,
    private herramientas:HerramientasService,
    public loadingController: LoadingController,
    private cantidadesService:CantidadesService
    ) { }

    uri = environment.URI;
    cantiPlatillos:any;
    cantiPedidos:any;
    cantiVentas:any;
    public user:any = [];

    public datosCargados = false;

    loading:any;
    private unsubscribe$ = new Subject<void>();

  async ngOnInit() {
    console.log("cargando storage");
    const storage = await this.userService.cargarStorage();
    console.log("storage cargado");
    console.log(this.userService.usuario);

    this.loadData();
    if (storage) {
      this.datosCargados = true;
    }
    console.log("ya cargue los datos");

    this.pedidosService.getCantiPedidos().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      this.cantiPedidos = res;
    }, err =>{
      console.log(err);
    });

    this.cantidadesService.getCantiPlatillos().pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
        console.log(res);
        this.cantiPlatillos = res;
      }
    )

    this.cantidadesService.getCantiPedidos().pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
        console.log(res);
        this.cantiPedidos = res;
      }
    )

    this.cantidadesService.getCantiVentas().pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
        console.log(res);
        this.cantiVentas = res;
      }
    )

  }

  async loadData(){
    
    this.user =  this.userService.usuario;
    console.log("usuario cargado");
    console.log("usuario cargado",this.user);
    if (this.user.plan === 'Prueba' && this.user.active === false) {
      this.loading = await this.loadingController.create({
        message:'Por favor espere'
      });
      await this.loading.present();
      console.log("faltan ampos");
      await this.loading.dismiss();
      this.router.navigate(['planes']);
    }else{
      console.log("no faltan campos");
    }
  }


  lastX:any
  onScroll(event) {
    if (event.detail.scrollTop > Math.max(0,this.lastX)){
      //subiendo
      this.scrollService.sendScroll('subiendo');
    }else{
      //bajandoconsole.log('le estoy enviando el mensaje a tabs components');
      this.scrollService.sendScroll('bajando');
    }
     this.lastX = event.detail.scrollTop
  }

  cerrarSesion(){
    this.userService.eliminarUsuario();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
