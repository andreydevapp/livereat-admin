import { Component, OnInit } from '@angular/core';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {

  constructor(private herramientas:HerramientasService,
    private registrarseService:RegistrarseService,
    private userService:UserService,
    private router:Router,
    private wsService:WebsocketService
    ) { }

  ngOnInit() {
  }
  
  negocio:string = '';
  correo:string = '';
  pass:string = '';
  pass2:string = '';
  fechaNaci:Date;
  file:File;
  photoSelected:string | ArrayBuffer;

  private unsubscribe$ = new Subject<void>();

  onImgSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  validar(){

    if (this.correo !== '' && this.pass !== '' && this.pass2 !== '' ) {
      if (this.pass === this.pass2) {
        if (this.file !== null) {
          this.guardarNegocio();
        }else{
          this.herramientas.presentAlert('Es necesario una foto para tu negocio');
        }
      }else{
        this.herramientas.presentAlert('Las contraseñas no cohiciden');
      }
      
    }else{
      this.herramientas.presentAlert('Es necesario llenar todos los campos');
    }

  }

  async guardarNegocio(){
    await this.herramientas.presentLoading()
    this.registrarseService.registrarUsario(this.negocio,this.correo,this.pass,this.file).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      const negocio:any = res;
      console.log('negocio',res);

      if (negocio.res === 'negocio registrado') {
        console.log("usuario registrado");
        //se guarda el usuario en la variable de entorno
        this.guardarUsuario(negocio);

      }else{
        console.log('hubo un error',res);
      }  
    
    }, err => {
      console.log(err);
    });

  }

  async guardarUsuario(user:any){
    await this.userService.guardarUsuario(user);
    this.guardarUsuarioWS(user);
  }

  guardarUsuarioWS(user:any){
   
    //se envia los datos del usuario a ws
    this.wsService.loginWS(user.nombreNegocio, user._id, user.imagen).then((res) => {
      console.log("respuesta del web socket");
      //se guarda en el storage
      this.userService.guardarStorage();
      this.herramientas.dismissLoading();
      this.router.navigate(['/tab-home']);
    
    }).catch((err) => {
    
      console.log(err);
      this.herramientas.dismissLoading();
      this.herramientas.presentAlert('usuario no registrado');
    
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
