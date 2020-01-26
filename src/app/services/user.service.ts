import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { Storage } from '@ionic/storage';
import { HerramientasService } from './herramientas.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public usuario: Usuario = null;

  constructor(private herramientas:HerramientasService,private storage: Storage) {
    
  }

  guardarUsuario(res){
    const user:any = res;
    this.usuario = new Usuario(user.nombre, user.id, user.token, user.imgUrl ,user.email);
    
    this.guardarStorage();
    console.log(user.imgUrl);
    //this.wsService.loginWS( user.nombre, user.id, user.imgUrl,'cliente');
    //console.log(this.wsService.usuario);
  }

  async guardarStorage(){

    const newUsuario = JSON.stringify(this.usuario);
    await this.storage.set('usuario',newUsuario);
    this.cargarStorage();
    console.log(newUsuario);

  }

  async cargarStorage() {
    var user:boolean = await this.storage.get('usuario').then((usuario) => {
      if (usuario !== null) {
        this.usuario = JSON.parse(usuario);
        this.herramientas.presentAlert('ya existe un usuario');
        return true;
      }else{
        this.herramientas.presentAlert('no existe un usuario');
        return false;
      }
    });
    return user;
  }

  getUsuario() {
    return this.usuario;
  }

}
