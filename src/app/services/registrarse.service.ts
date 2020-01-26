import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {environment,cliente} from '../../environments/environment.prod';
import {environment,cliente} from '../../environments/environment.prod';
import { HTTP } from '@ionic-native/http/ngx';
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
    const token = usuario.token;

    const payload = {
      token
    };

    return this.http.post(`${environment.URI}${cliente.loguearsePorToken}`,payload);

  }
  
  registrarNuevoUsusario(nombre,apellido,correo,pass,cedula,img:File){
    const fm = new FormData;
    console.log(nombre);
    fm.append('nombre', nombre+' '+apellido);
    fm.append('correo', correo);
    fm.append('password', pass);
    fm.append('cedula', cedula);
    fm.append('imagen', img);
    console.log(fm);
    return this.http.post(`${environment.URI}${cliente.registrarse}`,fm);
  }


  protected(){
    const usuario = this.userService.getUsuario();
    const token = usuario.token;
    this.httpOptions.headers =
    this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.URI}protected`, this.httpOptions);
  }

}
