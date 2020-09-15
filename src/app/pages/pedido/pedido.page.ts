import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { estadosPedidos, environment } from 'src/environments/environment.prod';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  
  aceptado:boolean = false;
  preparacion:boolean = false;
  enviado:boolean = false;
  entregado:boolean = false;
  
  txtAceptado:string = '¿Quieres cambiar el estado de este pedido como <strong>"Aceptado"</strong>?';
  txtpreparacion:string = '¿Quieres cambiar el estado de este pedido a <strong>"Preparación"</strong>?';
  txtenviado:string = '¿Quieres cambiar el estado de este pedido a <strong>"Enviado"</strong>?';
  txtEntregado:string = '¿Quieres cambiar el estado de este pedido como <strong>"Entregado"</strong>?';

  iva = 0;

  datoSCargados = false;

  pedido:any = [];
  uri = environment.URI;

  idFactura = '';
  idCliente = '';
  nombreCliente = '';
  imgCliente = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private activateRoute:ActivatedRoute,
    private pedidosService:PedidosService,
    public alertController: AlertController) { }

  ngOnInit() {

    this.iva = this.pedido.totalSinIva * 0.1;
    this.pedido = this.pedidosService.pedido;
    console.log(this.pedido);
    if (this.pedido.aceptado.estado === true) {
      this.aceptado = true;
    } if(this.pedido.enProceso.estado === true){
      this.aceptado = true;
      this.preparacion = true;
    } if(this.pedido.enviado.estado === true){
      this.aceptado = true;
      this.preparacion = true;
      this.enviado = true;
    } if(this.pedido.entregado.estado === true){
      this.aceptado = true;
      this.preparacion = true;
      this.enviado = true;
      this.entregado = true;
    } if(this.pedido.cancelado.estado === true){
      
    }
    

  }

  validarEstado(opc){
    if (opc === "aceptado") {
      this.presentAlertConfirm(this.txtAceptado,opc);
    }else if(opc === "preparacion"){
      this.presentAlertConfirm(this.txtEntregado,opc);
    }else if(opc === "enviado"){
      this.presentAlertConfirm(this.txtenviado,opc);
    }else if(opc === "entregdo"){
      this.presentAlertConfirm(this.txtpreparacion,opc)
    }else if(opc === "cancelado"){
      
    }
  }

  async presentAlertConfirm(txt,opc) {
    
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: txt,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.quitarCheck(opc);
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.cambiaEstado(opc);
          }
        }
      ]
    });

    await alert.present();
  }

  cambiaEstado(opc){
    if (opc === "aceptado") {
      this.aceptado = true;
      this.cambiarEstadoEnDb(estadosPedidos.modificarAceptado);
    }else if(opc === "preparacion"){
      this.aceptado = true;
      this.preparacion = true;
      this.cambiarEstadoEnDb(estadosPedidos.modificarProceso);
    }else if(opc === "enviado"){
      this.aceptado = true;
      this.preparacion = true;
      this.enviado = true;
      this.cambiarEstadoEnDb(estadosPedidos.modificarEnviado);
    }else if(opc === "entregdo"){
      this.aceptado = true;
      this.preparacion = true;
      this.enviado = true;
      this.entregado = true;
      this.cambiarEstadoEnDb(estadosPedidos.modificarEntregado);
    }else if(opc === "cancelado"){
      
    }
  }

  quitarCheck(opc){
    if (opc === "aceptado") {
      this.aceptado = false;
    }else if(opc === "preparacion"){
      this.preparacion = false;
    }else if(opc === "enviado"){
      this.enviado = false;
    }else if(opc === "entregdo"){
      this.entregado = false;
    }else if(opc === "cancelado"){
      
    }
  }

  cambiarEstadoEnDb(opc){
    console.log("modificar");
    this.pedidosService.modificarEstadoFacturas(this.pedido,opc).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe( res => {
      console.log(res);
      this.pedidosService.cargarFacturas(res);
     console.log(this.pedido);
    },err => {
      console.log(err);
    });
  }

  factura= {
    "consecutivo":"111111",
    "negocio":{
      "propietario":{
        "identidad":{
          "fisica":0,
          "juridica":123456789
        },
        "nombreCompleto":"Andrey Castillo Duarte",
        "email":"andrey@gmail.com",
        "telefono":22222222
      },
      "nombreNegocio":"Soda Tey",
      "email":"sodatey@gmail.com",
      "direccion":"en la cas",
      "telefono":987654321
    },
    "cliente":{
      "nombre":"Gabriela",
      "identidad":{
        "fisica":123456789,
        "juridica":0
      },
      "email":"gabi@gmail.com",
      "direccion":"en la as",
      "telefono":111189765
    },
    "producto":[{
      "nombre":"Hamburguesa",
      "precioUnitario":1500,
      "descriopcion":"Una hamburguesa que engorda",
      "cantidad":2
    }],
    "iva":0.13,
    "subtotal":3000,
    "descuento":0,
    "total":3390,
    "fecha":"hoy"

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
