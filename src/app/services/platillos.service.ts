import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, http_platillo_method} from '../../environments/environment.prod';
import { UserService } from './user.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http:HttpClient, private userService:UserService) { }

  private btnTabIndex = new Subject<any>();

  sendBtnActive() {
    this.btnTabIndex.next({ active: true });
  }

  getBtnActive(): Observable<any> {
    return this.btnTabIndex.asObservable();
  }

  obtenerTodosLosPlatillos(tipo,encabezadoDeFiltro,tipoFiltro){
    
    const opc = `${tipo}separador${this.userService.usuario.id}separador${this.userService.usuario.token}separador${encabezadoDeFiltro}separador${tipoFiltro}`

    return this.http.get(`${environment.URI}${http_platillo_method.obtener}${opc}`);
    
  }

  obtenerCantiPlatillos(){
    const payload = { idNegocio:this.userService.usuario.id,token:this.userService.usuario.token};
    return this.http.post(`${environment.URI}${http_platillo_method.obtenerCantidadPlatillos}`,payload)
  }

  crearPlatillos(nombre,descripcion,precio,tipo,estado,file:File){

    const fm = new FormData;

    fm.append('nombre', nombre);
    fm.append('descripcion', descripcion);
    fm.append('precio', precio);
    fm.append('tipo', tipo);
    fm.append('estado', estado);
    fm.append('imagen', file);
    fm.append('token', this.userService.usuario.token);
    fm.append('_idNegocio', this.userService.usuario.id);

    var urlMethod = "";

    if (tipo === "Platillo") {
      urlMethod = http_platillo_method.guardarPlatillo;
    }else{
      urlMethod = http_platillo_method.guardarBebida;
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'multipart/form-data');
    
    return this.http.post(`${environment.URI}${urlMethod}`,fm );
  }

  modificarPlatillo(_id,opc,data){

    const payload = {
      token: this.userService.usuario.token,
      _id,
      opc,
      data
    };

    return this.http.post(`${environment.URI}${http_platillo_method.modificar}`, payload);
  }

  modificarConImagen(_id,imgPath,file:File,tipo){

    const fm = new FormData;

    fm.append('_id', _id);
    fm.append('imgPath', imgPath);
    fm.append('imagen', file);
    fm.append('_idNegocio', this.userService.usuario.id);
    fm.append('token', this.userService.usuario.token);

    let opc = '';

    if (tipo === 'Platillo') {
      opc = http_platillo_method.modificarConImagenPlatllo; 
    }else{
      opc = http_platillo_method.modificarConImagenBebida; 
    }

    return this.http.post(`${environment.URI}${opc}`, fm);
  }

  modificarEstadoOAccesibilidad(_idPlatillo,query,estadoActual,encabezado,tipoFiltro,tipo){
    const payload = {
      _idNegocio:this.userService.usuario.id,
      _idPlatillo,
      query,//modificar el estado o accesibilidd
      estadoActual,// 1 o 2
      encabezado,//la opcion de filtro
      tipoFiltro,//orden del filtro
      tipo,//platillo o bebida
      token: this.userService.usuario.token
    };
    return this.http.post(`${environment.URI}${http_platillo_method.modificarAccesibilidadEstado}`, payload);
  }

  eliminarPlatillo(_id,tipo,encabezadoDeFiltro,tipoFiltro,imagen){

    const payload = {
      idPlatillo: _id,
      tipo,
      idUsuario: this.userService.usuario.id,
      token: this.userService.usuario.token,
      encabezado: encabezadoDeFiltro,
      tipoFiltro: tipoFiltro,
      rutaImagen: imagen
    };
    
    return this.http.post(`${environment.URI}${http_platillo_method.eliminar}`,payload);
  }

  obtenrUnPlatillo(idPlatillo){
    const payload = {
      token: this.userService.usuario.token,
      idPlatillo
    };
    return this.http.post(`${environment.URI}${http_platillo_method.obtenerUnPlatillo}`, payload);
  }


}
