import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollService } from 'src/app/services/scroll.service';
import { Router } from '@angular/router';
import { environment, estadosPedidos } from 'src/environments/environment.prod';
import { HerramientasService } from 'src/app/services/herramientas.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  facturas:any = [];
  uri = environment.URI;

  private unsubscribe$ = new Subject<void>();

  constructor(private pedidosService:PedidosService,
    private scrollService:ScrollService,
    private routerService:Router,
    private herramientas:HerramientasService) { }

  ngOnInit() {
    this.obtenerFacturas();
    this.pedidosService.getFacturas().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.facturas = res;
      console.log(res);
    },err => {
      console.log(err);
    });
  }

  lastX:any
  onScroll(event) {
    if (event.detail.scrollTop > Math.max(0,this.lastX)){
      //subiendo
      this.scrollService.sendScrollChat('subiendo');
    }else{
      //bajandoconsole.log('le estoy enviando el mensaje a tabs components');
      this.scrollService.sendScrollChat('bajando');
    }
     this.lastX = event.detail.scrollTop
  }

  async doRefresh(event) {
    await this.herramientas.presentLoading();
    this.pedidosService.obtenerFacturas().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.herramientas.dismissLoading();
      this.facturas = res;
      event.target.complete();
      console.log(res);
    },err => {
      this.herramientas.dismissLoading();
      console.log(err);
    });
    console.log('Async operation has ended');
    
  }

  async obtenerFacturas(){
    await this.herramientas.presentLoading();
    this.pedidosService.obtenerFacturas().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.herramientas.dismissLoading();
      this.facturas = res;
      console.log(res);
    },err => {
      this.herramientas.dismissLoading();
      console.log(err);
    });
  }

  ver_pedido(factura:any){
    
    if (factura.visto.estado === false) {
      console.log("modificar visto")
      this.modificarEstadoPedidos(factura);
    }else{
      this.pedidosService.pedido = factura;
      this.routerService.navigate(['/pedido']);
    }
  }

  modificarEstadoPedidos(factura:any){
    this.pedidosService.modificarEstadoFacturas(factura,estadosPedidos.modificarVisto).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe( res => {
      console.log(res);
      this.facturas = res;
      this.pedidosService.pedido = this.facturas.facturas.filter(newfactura => newfactura._id === factura._id);
      this.cantidadPedidos();
     
    },err => {
      console.log(err);
    });
  }

  cantidadPedidos(){
    console.log("hola");
    this.pedidosService.obtenerNumPedidos().pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
        console.log(res);
        this.pedidosService.cargarCantiPedidos(res);
        this.routerService.navigate(['/pedido']);
      },
      err => {
        
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

  

}
