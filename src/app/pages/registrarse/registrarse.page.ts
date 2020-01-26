import { Component, OnInit } from '@angular/core';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  constructor(private herramientas:HerramientasService,
    private registrarseService:RegistrarseService,
    private wsService:WebsocketService,
    private userService:UserService) { }

  ngOnInit() {
  }

  nombre:string = '';
  apellido:string = '';
  cedula:string = '';
  correo:string = '';
  pass:string = '';

  file:File;
  photoSelected:string | ArrayBuffer;

  validar(){

    if (this.nombre !== '' && this.apellido !== '' && this.cedula !== '' && this.correo !== '' && this.pass !== '') {
      this.registrarUsuario(); 
    }else{
      this.herramientas.presentAlert('Es necesario llenar todos los campos');
    }

  }

  async registrarUsuario(){

    //se presenta el loading
    await this.herramientas.presentLoading();

    //se registra el usuario
    this.registrarseService.registrarNuevoUsusario(this.nombre,this.apellido,this.correo,this.pass,this.cedula,this.file).subscribe(async res => {
      
      const user:any = res;

      if (user.res === 'usuario registrado') {
    
        //se guarda el usuario en la variable de entorno
        this.userService.guardarUsuario(res);
        this.guardarUsuarioWS(res);
        
      }else{

        this.herramientas.presentAlert(user.res);
        this.herramientas.dismissLoading();
      
      }  

      //se guarda los datos en el servicio ws
      this.guardarUsuarioWS(res);

    },err => {

      console.log(err);
      this.herramientas.dismissLoading();
      this.herramientas.presentAlert('Ocurrio un error');
    
    });
  }

  guardarUsuarioWS(user:any){
    //se guarda los datos en el ws, en el ws hay un metodo para guardar los datos en la variable de entorno de    usuario
    this.wsService.loginWS(user.nombre, user.id, user.imgUrl, 'cliente').then((res) => {
    
      //se guarda en el storage
      this.userService.guardarStorage();
      this.herramientas.dismissLoading();
    
    }).catch((err) => {

      console.log(err);
      this.herramientas.dismissLoading();
      this.herramientas.presentAlert('Ocurrio un error');
    
    });
  }

  onImgSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }


}
