import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RegistrarseService } from 'src/app/services/registrarse.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private router:Router,
    private herramientas:HerramientasService,
    private userService:UserService,
    private wsService:WebsocketService,
    private registrarseService:RegistrarseService) { 
    }

  ngOnInit() {
    
    this.cargarStorage();  

  }

  async cargarStorage(){

    const existe = await this.userService.cargarStorage();

    if (existe) {

      //validamos si el token tiene acceso
      this.validar_token();
      
    }else{

      this.herramientas.presentAlert('no existe un usuario');
      this.router.navigate(["iniciar-sesion"]);
    
    }

  }

  validar_token(){

    this.registrarseService.protected().subscribe(res => {

      const respuesta:any = res;

      console.log(respuesta);

      if (respuesta.res === 'protected') {
        //tiene acceso
        this.registrarPorToken();
      }else{
        this.router.navigate(["iniciar-sesion"]);
      }

    }, err => {

    })

  }

  registrarPorToken(){

    this.registrarseService.iniciarSesionPorToken().subscribe(res => {

      console.log('hola',res);
      const user:any = res;

      if (user.res === 'usuario registrado') {
    
        //se guarda el usuario en la variable de entorno
        this.userService.guardarUsuario(res);

        //se envia la informacion del usuario para el servicio de ws
        this.guardarUsuarioWS();
        
      }else{
        this.router.navigate(["iniciar-sesion"]);
      }  

    }, err => {



    })
  }

  guardarUsuarioWS(){
  
    const user:any = this.userService.getUsuario(); 
  
    //se envia los datos del usuario a ws
    this.wsService.loginWS(user.nombre, user.id, user.imgUrl, 'cliente').then((res) => {
    
      //se guarda en el storage
      this.userService.guardarStorage();
      this.router.navigate(['/tabs']);
    
    }).catch((err) => {
    
    
    });

  }

}
