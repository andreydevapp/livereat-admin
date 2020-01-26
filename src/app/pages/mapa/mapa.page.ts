import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var mapboxgl:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private geolocation:Geolocation) { }

  ngOnInit() {
  }

  lat:number;
  lon:number;

  map:any;

  async ngAfterViewInit(){
    this.geolocation.getCurrentPosition().then((geoposition:Geoposition) =>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log(geoposition);
      this.cargarMapa();
    });
  }

  /*
  cargar_Negocios(){
    this.negociosService.get_Negocios().subscribe(res=>{
      this.negocios = res;
      this.cargarMapa();
      console.log(res);
    },err=>{

    })
  }
  */

  cargarMapa(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV5ZGV2byIsImEiOiJjazJmMWh1aDAwZnB2M21xd2U4cjhvYW82In0.vHZ62CmExD5nlIOQSA3DRg';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [this.lon, this.lat], // starting position [lng, lat]
      zoom: 16 // starting zoom
    });
    this.marcadores();
  }

  marcadores(){

    /*
    idUser
    lat
    lon
    nombre
    imagen
    */

    new mapboxgl.Marker()
    .setLngLat([this.lon, this.lat])
    .addTo(this.map);

    /*
    for (const negocio of this.negocios) {
      console.log('hola',this.lon)
      //se crea el poputs
      var popup = new mapboxgl.Popup()
      .setLngLat([negocio.location.coordinates[0],negocio.location.coordinates[1]])
      .setHTML(`<span>${negocio.nombre}</span>`);

      //creamos la vista del marker
      var el = document.createElement('div');
      el.id = 'marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.cursor = 'pointer';
      el.style.backgroundImage = "url('../../../assets/icon/marcador_restaurante.png')";
      el.style.backgroundSize = 'cover';
      //se le agrega el id del marker que viene de la db
      el.onclick = function(){callFunction(negocio._id,negocio.nombre,negocio.imagen)};
  
      var _self = this;

      function callFunction(idNegocio,nombre,imagen) {
        _self.markerSeleccionado(idNegocio,nombre,imagen);
      }

      //se crea el marquer
      new mapboxgl.Marker(el)
      .setLngLat([negocio.location.coordinates[0],negocio.location.coordinates[1]])
      .setPopup(popup)
      .addTo(this.map);

    }
    */
   
  }

  /*
  async markerSeleccionado(idNegocio,nombre, imagen){
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        idNegocio,
        nombre,
        imagen
      }
    });
    await modal.present();
  }
  */

}
