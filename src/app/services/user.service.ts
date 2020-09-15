import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { Storage } from '@ionic/storage';
import { HerramientasService } from './herramientas.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public usuario: Usuario;

  private loadData = new Subject<any>();
  sendloadData(opc) {
    this.loadData.next({ loadData: true });
  }

  getloadData(): Observable<any> {
    return this.loadData.asObservable();
  }

  constructor(private herramientas:HerramientasService,
    private storage: Storage,
    private router:Router) {}

  async guardarUsuario(res){
    const user:any = res;
    this.usuario = await new Usuario(
      //usuario
      user.nombreUsuario, user._id, user.tokenTem, user.email,
      //negocio
      user.nombreNegocio, user.imagen, user.imagenMin, user.location.coordinates[0], user.location.coordinates[1], user.tipoPlan, user.active
    );

    console.log('usuario',this.usuario);
    
    await this.guardarStorage();
    //this.wsService.loginWS( user.nombre, user.id, user.imgUrl,'cliente');
    //console.log(this.wsService.usuario);
    return 'usuario guardado';
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
        return true;
      }else{
        return false;
      }
    });
    return user;
  }

  async eliminarUsuario(){
    this.storage.remove('usuario').then((usuario) => {
      this.router.navigate(['/iniciar-sesion']);
    });
  }

  getUsuario() {
    return this.usuario;
  }

}
