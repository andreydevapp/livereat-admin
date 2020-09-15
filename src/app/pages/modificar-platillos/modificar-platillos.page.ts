import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { PlatillosService } from 'src/app/services/platillos.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
} 
@Component({
  selector: 'app-modificar-platillos',
  templateUrl: './modificar-platillos.page.html',
  styleUrls: ['./modificar-platillos.page.scss'],
})
export class ModificarPlatillosPage implements OnInit {

  _idPlatillo:string = '';
  nombre:string = '';
  nuevoNombre = '';
  precio:number;
  nuevoPrecio:number;
  descripcion:string;
  nuevaDescripcion:string;
  data:any = [];
  platillo:any = [];
  opc:string = '';
  tituloImagen:string = 'Imagen del platillo';
  file:File;
  photoSelected:string | ArrayBuffer;
  msmTipo:string = 'del platillo';
  uri = environment.URI;
  
  private unsubscribe$ = new Subject<void>();

  constructor(public userService:UserService,
    private scrollService:ScrollService,
    private router:Router,
    private platillosService:PlatillosService,
    private herramientas: HerramientasService,
    private route: ActivatedRoute,
    private alertController: AlertController,) { }

  ngOnInit() {}

  async ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._idPlatillo = this.route.snapshot.paramMap.get("id");

    await this.herramientas.presentLoading();
    this.platillosService.obtenrUnPlatillo(this._idPlatillo).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      console.log(res);

      this.data = res;
      this.platillo = this.data.platillo;

      if (this.data.res !== "forbiden") {
        this.nombre = this.platillo.nombre;
        this.precio = this.platillo.precio;
        this.descripcion = this.platillo.descripcion;
        
        if (this.platillo.tipo === 'Platillo') {
          this.tituloImagen = 'Imagen del platillo';
          this.msmTipo = 'del platillo';
        }else{
          this.tituloImagen = 'Imagen de la bebida';
          this.msmTipo = 'del la bebida';
        }
        
        await this.herramientas.dismissLoading();
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
      console.log('si entre');
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
      this.presentAlertImgConfirm();
    }else{
      console.log('no entre');
    }
  }

  async presentAlertImgConfirm() {
    const alert = await this.alertController.create({
      header: `Remplazar imagen`,
      message: `¿Deseas remplazar la imagen ${this.msmTipo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.file = null;
            this.photoSelected = null;
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.putImg();
          }
        }
      ]
    });

    await alert.present();
  }

  putImg(){

    this.platillosService.modificarConImagen(this._idPlatillo,this.platillo.imagen,this.file,this.platillo.tipo).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      console.log(res);

      this.data = res;
      this.platillo = this.data.platillo;

      if (this.data.res !== "forbiden") {
        this.nombre = this.platillo.nombre;
        this.precio = this.platillo.precio;
        this.descripcion = this.platillo.descripcion;
        
        if (this.platillo.tipo === 'Platillo') {
          this.tituloImagen = 'Imagen del platillo';
          this.msmTipo = 'del platillo';
        }else{
          this.tituloImagen = 'Imagen de la bebida';
          this.msmTipo = 'del la bebida';
        }
        
        await this.herramientas.dismissLoading();
        await this.herramientas.presentAlert('Imagen del platillo modificada');
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

  putNombre(){
    this.presentAlert('Nombre',this.nombre,'text');
  }

  putPrecio(){
    this.presentAlert('Precio',this.precio,'text');
  }

  putDescripcion(){
    this.presentAlert('Descripcion',this.descripcion,'text');
  }

  async presentAlert(header,placeholder,type) {
    const alert = await this.alertController.create({
      header,
      inputs: [
        {
          name: 'txt',
          type,
          placeholder
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if (header === 'Nombre') {
              this.validarNombre(data.txt);
            }else if (header === 'Precio') {
              this.validarPrecio(data.txt);
            }else if (header === 'Descripcion') {
              this.validarDescripcion(data.txt);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  validarNombre(nuevoNombre){
    if (nuevoNombre !== '') {
      if (nuevoNombre !== this.nombre) {
        
        this.guardarCambios('Nombre',nuevoNombre);
      }else{
        console.log('sin modificaciones');
      }  
    }else{
      console.log('input vacio');
    }
  }

  validarPrecio(nuevoPrecio){
    if (nuevoPrecio !== '') {
      if (nuevoPrecio !== this.precio) {
        
        this.guardarCambios('Precio',nuevoPrecio);
      }else{
        console.log('sin modificaciones');
      }  
    }else{
      console.log('input vacio');
    }
  }

  validarDescripcion(nuevaDescripcion){
    if (nuevaDescripcion !== '') {
      if (nuevaDescripcion !== this.descripcion) {
        
        this.guardarCambios('Descripcion',nuevaDescripcion);
      }else{
        console.log('sin modificaciones');
      }  
    }else{
      console.log('input vacio');
    }
  }

  async guardarCambios(opc,newData){
    console.log("modificado");

    await this.herramientas.presentLoading();

    this.platillosService.modificarPlatillo(this._idPlatillo,opc,newData).pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(async res => {

      console.log(res);

      this.data = res;
      this.platillo = this.data.platillo;

      if (this.data.res !== "forbiden") {
        this.nombre = this.platillo.nombre;
        this.precio = this.platillo.precio;
        this.descripcion = this.platillo.descripcion;
        await this.herramientas.dismissLoading();
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


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
