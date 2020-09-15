import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverInfoComponent } from '../../../../components/popover-info/popover-info.component';
import { PopoverFiltroComponent } from '../../../../components/popover-filtro/popover-filtro.component';
import { PlatillosService } from 'src/app/services/platillos.service';
import { takeUntil } from 'rxjs/operators';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { environment } from 'src/environments/environment.prod';
import { LogueoService } from 'src/app/services/logueo.service';



@Component({
  selector: 'app-mis-platillos',
  templateUrl: './mis-platillos.page.html',
  styleUrls: ['./mis-platillos.page.scss'],
})
export class MisPlatillosPage implements OnInit {

  tipo = "Platillo";
  
  platillos:any = []; 
  public uri:any = environment.URI;
  _idPlatillo:string = "";
  hayPlatillos = true;

  estadoTemp:number;
  accesibilidadTem:number;
  nombrePlatilloTem:string = "";
  imagenPlatilloTem:string = "";
  mensajeAlert = '';


  filtro = {
    encabezado:"fecha",
    tipoFiltro:-1
  }

  estadosDelPlatillo = {
    opcQuery:String,
    estadoActual:Number
  }


  constructor(public userService:UserService,
    private scrollService:ScrollService,
    private router:Router,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private platillosService: PlatillosService,
    private herramientas: HerramientasService,
    private logueoService:LogueoService) { }

    public datosCargados = false;
    private unsubscribe$ = new Subject<void>();

  async ngOnInit() {
    const storage = await this.userService.cargarStorage();
    
    if (storage) {
      this.datosCargados = true;
      this.obtenerLosPlatillos();
    }

  }

  async obtenerLosPlatillos(){

    await this.herramientas.presentLoading();

    this.platillosService.obtenerTodosLosPlatillos(this.tipo,this.filtro.encabezado,this.filtro.tipoFiltro).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {
      this.platillos = [];
      const data:any = res;

      if (data.res !== "forbiden") {
        if (data.res === "platillos") {
          this.platillos = res;
          console.log(data);
          this.hayPlatillos = true;
          this.herramientas.dismissLoading();
        }else{
          this.mensajeAlert = data.res;
          this.hayPlatillos = false;
          this.herramientas.dismissLoading();
        }
      }else{
        await this.herramientas.dismissLoading();
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
      }
      
      
    },async err => {
      console.log(err);
      await this.herramientas.dismissLoading();
      await this.herramientas.presentAlert('Ocurrio un error');
    });
  }

  seleccionarTipo(tipo){
    this.tipo = tipo;
    this.obtenerLosPlatillos();
  }

  segmentChanged(ev: any) {
    this.tipo = ev.detail.value;
    this.obtenerLosPlatillos();
    console.log('Segment changed', ev);
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

  async doRefresh(event){

    this.platillosService.obtenerTodosLosPlatillos(this.tipo,this.filtro.encabezado,this.filtro.tipoFiltro).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      const data:any = res;

      if (data.res !== "forbiden") {
        if (data.res === "platillos") {
          this.platillos = res;
          console.log(data);
          this.hayPlatillos = true;
          event.target.complete();
        }else{
          this.mensajeAlert = data.res;
          this.hayPlatillos = false;
          event.target.complete();
        }
        
      }else{
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
        event.target.complete();
      }
      
      
    },async err => {
      console.log(err);
      await this.herramientas.presentAlert('Ocurrio un error');
      event.target.complete();
    });

  }

  async presentarPopover(ev: any, _idPlatillo,nombre, imagen, estado,accesibilidad) {

    this._idPlatillo = _idPlatillo;
    this.nombrePlatilloTem = nombre;
    this.imagenPlatilloTem = imagen;
    this.estadoTemp = estado;
    this.accesibilidadTem = accesibilidad;
    console.log("id",this._idPlatillo);

    const popover = await this.popoverController.create({
      component: PopoverInfoComponent,
      event: ev,
      mode:'ios',
      componentProps: {
        estadoActual:estado,
        accesibilidadActual:accesibilidad
      }
    });
    
    await popover.present();

    const {data}:any = await popover.onDidDismiss();

    switch (data.opcQuery) {
      case 'editarPlatillo':

        console.log('si entre');
        this.router.navigate(['/modificar-platillos',this._idPlatillo]);
        
      break;

      case 'editarAccesibilidad':
        
        this.estadosDelPlatillo.opcQuery = data.opcQuery;
        this.estadosDelPlatillo.estadoActual = data.estadoActual;
        if (data.estadoActual === 1) {
          this.presentAlert('Al establecer la accesibilidad del platillo <strong>'+this.nombrePlatilloTem+'</strong> como oculto, nadie más podrá ver este platillo en tu menú', 'editarAccesibilidad');
        }else{
          this.presentAlert('Al establecer la accesibilidad del platillo <strong>'+this.nombrePlatilloTem+'</strong> como público, todos podrán ver este platillo en tu menú', 'editarAccesibilidad');
        }
        
      break;

      case 'editarEstado':
        this.estadosDelPlatillo.opcQuery = data.opcQuery;
        this.estadosDelPlatillo.estadoActual = data.estadoActual;
        console.log(data);
        if (data.estadoActual === 1) {
          this.presentAlert('Si estableces el platillo <strong>'+this.nombrePlatilloTem+'</strong> como <strong>agotado</strong>, todos verán este platillo en tú menú pero no podrán comprarlo.', 'editarEstado');
          
        }else{
          this.presentAlert('Si estableces el platillo <strong>'+this.nombrePlatilloTem+'</strong> como <strong>En Stock</strong>, todos verán este platillo en tú menú y podrán comprarlo.', 'editarEstado');
          
        }
        
        console.log('editarEstado');
        
      break;

      case 'eliminar':

        console.log('eliminar', this.nombrePlatilloTem);
        this.presentAlert('Desea eliminar este platillo: <strong>'+this.nombrePlatilloTem+'</strong>?', 'eliminar');
        
      break;
    
      default:
      break;
    }

  }

  async presentAlert(message, opc) {
    console.log(opc);
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //no hago nada bb
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            switch (opc) {
              case 'editarAccesibilidad':
                this.modificarEstadoOAccesibilidad();
              break;
              case 'editarEstado':
                this.modificarEstadoOAccesibilidad();
              break;
              case 'eliminar':
                this.eliminarPlatillo();
              break;
            
              default:
              break;
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async modificarEstadoOAccesibilidad(){
    console.log("platillo modificado");
    await this.herramientas.presentLoading();
    this.platillosService.modificarEstadoOAccesibilidad(
      this._idPlatillo,
      this.estadosDelPlatillo.opcQuery,
      this.estadosDelPlatillo.estadoActual,
      this.filtro.encabezado,
      this.filtro.tipoFiltro,      
      this.tipo)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(async res => {

      const data:any = res;
      console.log(data);

      if (data.res !== "forbiden") {

        if (data.res === "platillos") {
          this.platillos = res;
          console.log(data);
          this.hayPlatillos = true;
          this.herramientas.dismissLoading();
        }else{
          this.herramientas.dismissLoading();
          this.hayPlatillos = false;
        }

        console.log(data);
      }else{
        this.herramientas.dismissLoading();
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
      }
      
      
    },async err => {
      console.log(err);
      this.herramientas.dismissLoading();
      await this.herramientas.presentAlert('Ocurrio un error');
    });
    console.log('platillo eliminado');
  }

  async presentarPopoverFiltro(ev: any) {

    const popover = await this.popoverController.create({
      component: PopoverFiltroComponent,
      event: ev,
      mode:'ios',
      componentProps: {
        encabezado:this.filtro.encabezado,
        tipoFiltro:this.filtro.tipoFiltro
      }
    });
    await popover.present();

    const {data}:any = await popover.onDidDismiss();

    //validar la opcion del usuario
    if (data.encabezado && data.tipoFiltro) {
      console.log(data.encabezado);
      console.log(data.tipoFiltro);
      console.log('si entre');

      this.filtro.encabezado = data.encabezado;
      this.filtro.tipoFiltro = data.tipoFiltro;

      this.obtenerLosPlatillos();

    }

  }

  async eliminarPlatillo(){

    this.herramientas.presentLoading();

    this.platillosService.eliminarPlatillo(this._idPlatillo,this.tipo,this.filtro.encabezado,this.filtro.tipoFiltro,this.imagenPlatilloTem).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      const data:any = res;
      console.log("platillo eliminado");

      if (data.res !== "forbiden") {

        if (data.res === "platillos") {
          this.platillos = res;
          console.log(data);
          this.hayPlatillos = true;
          this.herramientas.dismissLoading();
        }else{
          this.herramientas.dismissLoading();
          this.hayPlatillos = false;
        }

        console.log(data);
      }else{
        this.herramientas.dismissLoading();
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
      }
      
      
    },async err => {
      console.log(err);
      this.herramientas.dismissLoading();
      await this.herramientas.presentAlert('Ocurrio un error');
    });
    console.log('platillo eliminado');
  }

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
