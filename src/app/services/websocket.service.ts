import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket,
    private router: Router,
    public usuarioService:UserService
  ) {
    this.checkStatus();
  }

    //valida cuando un usuario se conecta o se desconecta
    checkStatus() {

      this.socket.on('connect', () => {
        this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        this.socketStatus = false;
      });
    }


    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }

    //funcionamiento contactos activos
    /*1- cuando un usuario al lado del cliente inicie la app, modificara un campo de la base de datos
    (usuario-activo = true), de esta manera se hara un order by de los usuarios que estan activos 
    */

   loginWS( nombre: string, id:string ,imgUrl:string,opc) {

    console.log(imgUrl);

    return new Promise(  (resolve, reject) => {

      this.emit( 'configurar-usuario', { nombre,id,imgUrl,opc }, resp => {
        const res:any = resp;
        console.log(res);
        
        this.usuarioService.usuario.idWS = res.idWs;
        console.log(this.usuarioService.usuario);
        resolve();

      });

    });

  }

    logoutWS() {
      this.usuarioService.usuario = null;
      localStorage.removeItem('usuario');

      const payload = {
        nombre: 'sin-nombre'
      };

      this.emit('configurar-usuario', payload, () => {} );
      this.router.navigateByUrl('');

    }

    configuararImgPerfil(pathImg){
      return new Promise(  (resolve, reject) => {
        const id = this.usuarioService.usuario.id;
        this.emit( 'configurar-ImgPerfil', { id, pathImg }, resp => {

          this.usuarioService.usuario.imgUrl = pathImg;
          localStorage.setItem('usuario', JSON.stringify(this.usuarioService.usuario));

          resolve();

        });

      });
    }

    


    getUsuariosActivos() {
      return this.listen( 'usuarios-activos' );
    }

    emitirUsuariosActivos() {
      this.emit( 'obtener-usuarios');
    }

    emitirUsusarioEnLina(id){
      this.emit( 'emitir-esta-en-linea',{id});
    }

    getUsusarioEnLinea(){
      return this.listen( 'get-usuario-en-linea' );
    }


    // metodos para los negocios
    getNegocios() {
      return this.listen( 'negocios-activos' );
    }


    emitirgetNegocios() {
      this.emit('obtener-negocios');
    }

}
