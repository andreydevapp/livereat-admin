import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';
import { environment,http_chat_method } from 'src/environments/environment.prod';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public socketStatus = false;

  URI = 'http://localhost:3000/';
  
  constructor(public wsService: WebsocketService,
    private usuarioService:UserService,
    private http:HttpClient) { }

  getUsuariosActivos() {
    return this.wsService.listen( 'usuarios-activos' );
  }

  emitirUsuariosActivos() {
    this.wsService.emit( 'obtener-usuarios');
  }

  getChat(){
    const payload = {
      token: this.usuarioService.usuario.token,
      id: this.usuarioService.usuario.id
    };
    return this.http.post(`${environment.URI}${http_chat_method.obtenerChats}`,payload);
  }
  
  getChatWsReceptor(){
    return this.wsService.listen( 'obtener-chats-receptor');
  }

  getChatWsReceptorPaginaHome(){
    return this.wsService.listen( 'obtener-chats-receptor-pagina-Home');
  }

  getChatWsEmisor(){
    return this.wsService.listen( 'obtener-chats-emisor');
  }

  /*
  

  postMensaje(myId,otherId,mensaje,miNombre,otherNombre,miImagen,otherImagen,myIdFb,otherIdFb){

    const payload = {
      myId,
      otherId,
      mensaje,
      miNombre,
      otherNombre,
      miImagen,
      otherImagen,
      myIdFb,
      otherIdFb
    };

    return this.http.post(`${this.URI}chat`,payload)
  }
  */

  postMensaje(myId,otherId,mensaje,miNombre,otherNombre,miImagen,otherImagen,imagenConsulta){
    return new Promise(  (resolve, reject) => {

      this.wsService.emit( 'enviar-mensaje', { myId,otherId,mensaje,miNombre,otherNombre,miImagen,otherImagen,imagenConsulta}, resp => {

        console.log('mensaje enviado');
        resolve();

      });

    });
  }

  getMensajes(myId,otherId){
    const payload = {myId,otherId,token:this.usuarioService.usuario.token};
    return this.http.post(`${environment.URI}${http_chat_method.obtenerMensajes}`, payload);
  }

  getMensajesWS() {
    return this.wsService.listen( 'recibir-mensaje' );
  }

  //obtiene la cnatidad de mensajes en tiempo real para mostrarlos en la pagina home
  getMensajesWsHomePage(){

  }

  modificarMensajesSinver(myId,otherId){
    console.log("modificar mensajes sin ver");
    const payload = {myId,otherId,token:this.usuarioService.usuario.token};
    return this.http.post(`${environment.URI}${http_chat_method.modificarMensajesSinVer}`,payload);
  }

  marcarVisto(myId,otherId){
    const payload = {myId,otherId};
    this.wsService.emit( 'marcar-visto',payload);
  }

  obtenerVistos(){
    return this.wsService.listen( 'obtener-visto' );
  }
  
  getMensajesSinVer(){
    return this.http.get(`${environment.URI}mensajes_sin_Ver/${this.usuarioService.usuario.id}`);
  }

}
