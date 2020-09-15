import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { PlatillosService } from 'src/app/services/platillos.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CantidadesService } from 'src/app/services/cantidades.service';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
} 

@Component({
  selector: 'app-crear-platillo',
  templateUrl: './crear-platillo.page.html',
  styleUrls: ['./crear-platillo.page.scss'],
})
export class CrearPlatilloPage implements OnInit {

  constructor(public userService:UserService,
    private scrollService:ScrollService,
    private router:Router,
    private platillosService:PlatillosService,
    private herramientas: HerramientasService,
    private cantidadesService:CantidadesService) { }

  ngOnInit() {
  }

  date:Date = new Date();

  file:File;
  photoSelected:string | ArrayBuffer;

  tipo:string = 'Platillo';
  tipoGuardado:string = 'Platillo creado con éxito.';
  tipoImagen:string = 'Imagen del Platillo';

  nombre:string = '';
  descripcion:string = '';
  precio:number;
  estado:string = "En Stock";
  isPlatillo:Boolean = true;
  isBebida:Boolean = false;

  vistaPrevia = false;
  nombreOpc = 'Nombre del platillo';
  informacionOpc = 'Información del platillo';
  uri = environment.URI;

  private unsubscribe$ = new Subject<void>();

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

  onImgSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  mostrarVistaPrevia(){
    if (!this.vistaPrevia) {
      this.vistaPrevia = true;
    }else{
      this.vistaPrevia = false;
    }
  }

  validarCategoria(check) {
    if (check === 'platillo') {
      this.isPlatillo = true;
      this.isBebida = false;
      console.log('es un platillo');
      this.nombreOpc = 'Nombre del platillo';
      this.informacionOpc = 'Información del platillo';
      this.tipoGuardado = 'Platillo creado con éxito.';
      this.tipo = 'Platillo';
      this.tipoImagen = 'Imagen del Platillo';
    }else{
      this.isPlatillo = false;
      this.isBebida = true;
      this.nombreOpc = "Nombre de la bebida";
      this.informacionOpc = 'Información de la bebida';
      this.tipo = 'Bebida';
      this.tipoGuardado = 'Bebida creada con éxito.';
      this.tipoImagen = 'Imagen de la Bebida';
      console.log('es una bebida');
    }
  }

  validarParaGuardar(){

    if (this.nombre !== '' && this.descripcion !== '' && this.precio) {
      if (this.precio > 0) {
        if (this.file) {
          this.guardar();
        }else{
          this.herramientas.presentAlert('Es necesaria una imagen de referencia.');
        }
      }else{
        this.herramientas.presentAlert('El precio debe de ser mayor a ₡0')
      }
    }else{
      this.herramientas.presentAlert('Hay campos necesaros por llenar.')
    }

  }

  async guardar(){
    await this.herramientas.presentLoading();

    this.platillosService.crearPlatillos(this.nombre,this.descripcion,this.precio,this.tipo,1,this.file).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      console.log(res);

      const data:any = res;
      console.log(data);
      if (data.res !== "forbiden") {
        this.cantidadesService.cargarCantiPlatillos(data.cantiPlatillos)
        await this.herramientas.presentAlert(this.tipoGuardado);
        this.platillosService.sendBtnActive();
      }else{
        await this.herramientas.presentAlert('Ocurrio un error en los permisos de usuario.');
      }

      await this.herramientas.dismissLoading();
      

  },async err => {
    console.log(err);
    await this.herramientas.dismissLoading();
    await this.herramientas.presentAlert('Ocurrio un error');

  });

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
