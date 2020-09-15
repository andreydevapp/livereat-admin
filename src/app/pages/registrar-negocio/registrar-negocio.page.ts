import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { UserService } from 'src/app/services/user.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsocketService } from 'src/app/services/websocket.service';
import { PlacesCrService } from 'src/app/services/places-cr.service';

declare var mapboxgl:any;

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.page.html',
  styleUrls: ['./registrar-negocio.page.scss'],
})
export class RegistrarNegocioPage implements OnInit, OnDestroy {

  constructor(private activateRoute:ActivatedRoute,
    private geolocation: Geolocation,
    private herramientas:HerramientasService,
    private registrarseService:RegistrarseService,
    private userService:UserService,
    private wsService:WebsocketService,
    private router:Router,
    private placesService:PlacesCrService) { }

  nombre = '';
  cedula:number;
  telefono:number;
  direccion:string = '';

  nombreNegocio = '';
  lon:number;
  lat:number;
  
  cargandoGeo=false;
  mostrarMapa=false;

  posicion=false;

  nomZona = '';
  precioZona = '';
  agregarZona = false;
  zonas:any = [];
  tipoCedula = "";
  codigoTipoCedula = "";

  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.herramientas.dismissLoading();
    this.placesService.getProvincias().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      const data:any = res;
      this.provincias = data.res;
      console.log("provincias",this.provincias);
    })
  }

  getGeo(){
   
    if (this.posicion) {
      this.posicion = false;
      this.mostrarMapa = false;
      this.lat = null;
      this.lon = null;
    }else{
      this.posicion = true;
      this.cargandoGeo = true;
      this.mostrarMapa = true;
      this.cargarMapa();
    }
    
  }

  cargarMapa(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;

      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV5ZGV2byIsImEiOiJjazJmMWh1aDAwZnB2M21xd2U4cjhvYW82In0.vHZ62CmExD5nlIOQSA3DRg';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center:[resp.coords.longitude,resp.coords.latitude],
        zoom:15
      });

      const marker = new mapboxgl.Marker()
      .setLngLat([resp.coords.longitude,resp.coords.latitude])
      .addTo(map);

      this.cargandoGeo = false;
      console.log(resp.coords);
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  mostrarAgregarZona(){
    this.agregarZona = true;
  }

  ocultarAgregarZona(){
    this.nomZona = '';
    this.precioZona = null;
    this.agregarZona = false;
  }

  agregarNuevaZona(){
    const payload = {
      lugar:this.nomZona,
      precio:this.precioZona
    }
    this.zonas.push(payload);
    console.log(this.zonas);
    this.nomZona = '';
    this.precioZona = null;
    this.agregarZona = false;
  }

  provincias:any = [];
  cantones:any = [];
  distritos:any = [];

  provinciaSelect:any = {id_provincia:0,Nombre:""};
  cantonSelect:any = {id_canton:"",Nombre:""};
  distritoSelect:any = {id_distrito:"",Nombre:""};

  idProvincia = 0;
  idCanton = "";
  idDistrito = "";
  provinciaSelected($event:any){

    this.idProvincia = 0;
    this.idCanton = "";
    this.idDistrito = "";

    const idProvincia = $event.detail.value;
    console.log("idProvincia",idProvincia);
    
    if (this.provinciaSelect.id !== idProvincia) {
      this.provinciaSelect = this.provincias.filter(provincia => provincia.id_provincia === idProvincia);
      console.log("provincia seleccionada",this.provinciaSelect);
      this.placesService.getCantones(idProvincia).pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.idProvincia = $event.detail.value
        const data:any = res;
        this.cantones = data.res;
        console.log(res);
      },err => {});
    }
  }

  cantonSelected($event:any){

    this.idCanton = "";
    this.idDistrito = "";
    const idCanton = $event.detail.value;
    console.log(idCanton);
    if (this.cantonSelect.id !== idCanton) {
      this.cantonSelect = this.cantones.filter(canton => canton.id_canton === idCanton);
      this.placesService.getDistritos(this.provinciaSelect[0].id_provincia,idCanton).pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.idCanton = $event.detail.value;
        console.log("distritos",res);
        const data:any = res; 
        this.distritos = data.res;
      },err => {
      })
    }
  }

  distritoSelected($event:any){
    this.distritoSelect = {};
    const idDistrito = $event.detail.value;
    console.log("id",idDistrito);
    this.idDistrito = $event.detail.value;
    this.distritoSelect = this.cantones.filter(distrito => distrito.id_canton === idDistrito);
    console.log("distrito seleccionado",this.distritoSelect);
  }

  validar(){
    console.log("tipo cedula",this.tipoCedula);
  
    if (
      this.nombre !== '' &&
      this.cedula !== null &&
      this.telefono !== null 
    ) {

      if (this.nombre  !== '') {
        if (this.tipoCedula !== '') {
          switch (this.tipoCedula) {
            case "Fisica":
              this.codigoTipoCedula = "01";
            break;
            case "Juridica":
              this.codigoTipoCedula = "02";
            break;
            case "Residencia":
              this.codigoTipoCedula = "03";
            break;
            case "Dimex":
              this.codigoTipoCedula = "04";
            break;
            case "Dimex":
              this.codigoTipoCedula = "05";
            break;
            case "NITE":
              this.codigoTipoCedula = "06";
            break;
            default:
            break;
          };
          console.log("Codigo tipo cedula",this.codigoTipoCedula);
          if (this.telefono !== null) {
            if (this.lat !== null && this.lon !== null) {
              if (this.provinciaSelect.Nombre !== "") {
                if (this.cantonSelect.Nombre !== "") {
                  if (this.idDistrito  !== "") {
                    console.log("codigo distrito",this.idDistrito);
                    
                    this.guardarNegocio();
                  }else{
                    this.herramientas.presentAlert('Selecciona un Distrito');
                  }
                }else{
                  this.herramientas.presentAlert('Selecciona un Cantón');
                }
              }else{
                this.herramientas.presentAlert('Selecciona una Provincia');
              }
              
            }else{
              this.herramientas.presentAlert('Para registrar tu negocio es necesario que actives "Obtener Ubicación"');
            }
          }else{
            this.herramientas.presentAlert('Es necesario un número de contacto para tu negocio');
          }
        }else{
          this.herramientas.presentAlert('Para registrar tu negocio es necesario que indiques un tipo de identificación');
        }
        
      }else{
        this.herramientas.presentAlert('Es neceserio tu nombre completo');
      }
      
    }else{
      this.herramientas.presentAlert('Ocurrio un error con los datos de usuario');
    }
  }

  async guardarNegocio(){

    //await this.herramientas.presentLoading();

    this.registrarseService.registrarNuevoNegocio(
      this.nombre,
      this.telefono,
      this.cedula,
      this.lon,
      this.lat,
      this.direccion,
      this.zonas,
      this.codigoTipoCedula,
      this.provinciaSelect[0].id_provincia,
      this.cantonSelect[0].id_canton,
      this.idDistrito 
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {

        const negocio:any = res;
        console.log('negocio',res);

        if (negocio.res === 'negocio registrado') {
    
          //se guarda el usuario en la variable de entorno
          this.guardarUsuario(negocio);
          
        }else{
  
          //this.herramientas.dismissLoading();
        
        }  

    },err => {

    });

  }

  async guardarUsuario(user:any){
    this.userService.guardarUsuario(user);
    this.guardarUsuarioWS(user);
  }

  guardarUsuarioWS(user:any){
   
    //se envia los datos del usuario a ws
    this.wsService.loginWS(user.nombreNegocio, user._id, user.imagen).then((res) => {
    
      //se guarda en el storage
      this.userService.guardarStorage();
      this.herramientas.dismissLoading();
      this.router.navigate(['tab-home']);
    
    }).catch((err) => {
    
      console.log(err);
      this.herramientas.dismissLoading();
      this.herramientas.presentAlert('usurio no registrado');
    
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
