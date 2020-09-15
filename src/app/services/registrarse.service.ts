import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {environment,cliente} from '../../environments/environment.prod';
import {environment,cliente} from '../../environments/environment.prod';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class RegistrarseService {

  constructor(private http: HttpClient,
    private userService:UserService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  iniciarSesion(correo,pass){
    console.log('iniciar')
    const payload = {
      correo,
      pass
    };

    return this.http.post(`${environment.URI}${cliente.loguearse}`,payload);

  }

  iniciarSesionPorToken(){
    console.log('iniciar')
    

    const usuario = this.userService.getUsuario();
    console.log('usuario storage es: ',usuario); 
    const token = usuario.token;

    const payload = {
      token
    };

    return this.http.post(`${environment.URI}${cliente.loguearsePorToken}`,payload);

  }

  registrarUsario(negocio,email,password,imagen:File){
    const fm = new FormData;
    fm.append('nombreNegocio', negocio);
    fm.append('email', email);
    fm.append('password', password);
    fm.append('imagen', imagen);
    return this.http.post(`${environment.URI}${cliente.registrarse}`,fm);
  }

  registrarNuevoNegocio(
    nombreUsuario,
    telefonoNegocio,
    cedula,
    lon,
    lat,
    direccion,
    envio,
    codigoCedula,
    idProvincia,
    idCanton,
    idDistrito
  ){

    const payload = {
      nombreUsuario,
      telefonoNegocio,
      cedula,
      lon,
      lat,
      direccion,
      envio,
      codigoCedula,
      idProvincia,
      idCanton,
      idDistrito,
      token:this.userService.usuario.token,
      idUser:this.userService.usuario.id
    };
    return this.http.post(`${environment.URI}${cliente.registrarNegocio}`,payload);
  }

  protected(){
    const usuario = this.userService.getUsuario();
    const token = usuario.token;
    this.httpOptions.headers =
    this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.URI}protected`, this.httpOptions);
  }

}
