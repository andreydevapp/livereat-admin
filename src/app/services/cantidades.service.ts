import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { http_cantidades_method, environment } from 'src/environments/environment.prod';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CantidadesService {

  pedidosNuevos = new Subject<any>();
  platillos = new Subject<any>();
  ventas = new Subject<any>();

  constructor(private userService:UserService, private http: HttpClient) { }

  obtenerCantiPedidosPlatillos(){
    const payload = {
      idNegocio: this.userService.usuario.id,
      token: this.userService.usuario.token
    };

    return this.http.post(environment.URI+http_cantidades_method.obtenerPlatillosPedidos,payload);

  }

  cargarCantiPedidos(canti:any) {
    this.pedidosNuevos.next(canti);
  }

  cargarCantiPlatillos(canti:any) {
    this.platillos.next(canti);
  }

  cargarCantiVentas(canti:any) {
    this.ventas.next(canti);
  }

  getCantiPedidos(): Observable<any> {
    return this.pedidosNuevos.asObservable();
  }

  getCantiPlatillos(): Observable<any> {
    return this.platillos.asObservable();
  }

  getCantiVentas(): Observable<any> {
    return this.ventas.asObservable();
  }

}
