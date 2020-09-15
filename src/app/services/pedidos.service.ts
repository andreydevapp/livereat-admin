import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment, http_pedidos_method } from 'src/environments/environment.prod';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient, private userService:UserService) { }


  pedido:any = [];

  private cantiPedidos = new Subject<any>();
  private facturas = new Subject<any>();

  cargarCantiPedidos(canti:any) {
    this.cantiPedidos.next(canti);
  }

  cargarFacturas(facturas:any) {
    this.facturas.next(facturas);
  }

  getCantiPedidos(): Observable<any> {
    return this.cantiPedidos.asObservable();
  }

  getFacturas(): Observable<any> {
    return this.facturas.asObservable();
  }

  cantidadPedidos(){
    const payload = {
      idNegocio:this.userService.usuario.id,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.cantidadPedidos}`, payload);
  }

  modificarEstadoFacturas(factura:any,opc){
    const payload = {
      idFactura:factura._id,
      idNegocio:this.userService.usuario.id,
      idCliente:factura.cliente.idCliente,
      opc,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.modificarFactura}`, payload);
  }

  obtenerFacturas(){
    const payload = {
      idNegocio:this.userService.usuario.id,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.obtenerFacturas}`, payload);
  }

  obtenerPedidos(idFactura,idCliente){
    const payload = {
      idFactura,
      idCliente,
      idNegocio:this.userService.usuario.id,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.obtenerPedidos}`, payload);
  }

  obtenerNumPedidos(){
    const payload = {
      idNegocio:this.userService.usuario.id,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.obtenerNumPedidos}`, payload);
  }

  modificarPedidos(opc,idFactura,idCliente){
    const payload = {
      idFactura,
      idCliente,
      opc,
      idNegocio:this.userService.usuario.id,
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_pedidos_method.modificarPedido}`, payload);
  }

}
