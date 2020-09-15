import { Component, OnInit, OnDestroy   } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit, OnDestroy {

  constructor(public loadingController: LoadingController,
    private herramientasService:HerramientasService,
    private fb: Facebook,
    private registrarseService:RegistrarseService,
    private userService:UserService,
    private wsService:WebsocketService,
    private storage:Storage,
    private router:Router
    ) { }

  ngOnInit() {
    
  }
  
  correo:String = '';
  pass:String = '';

  private unsubscribe$ = new Subject<void>();

  async validar(){

    if (this.correo !== '' && this.pass !== '') {
      await this.herramientasService.presentLoading();
      this.loguearse();
    }else{
      this.herramientasService.presentAlert('Es necesario llenar todos los campos');
    }
  }

  loguearse(){
    
    this.registrarseService.iniciarSesion(this.correo,this.pass)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(res => {
      
      console.log("negocio logueado",res);
      const user:any = res;

      if (user.res === 'negocio registrado') {
    
        //se guarda el usuario en la variable de entorno
        console.log("negocio registrado",user);
        
        this.guardarUsuario(user);
        
      }else{

        this.herramientasService.dismissLoading();
        this.herramientasService.presentAlert('Tu direccion de correo electronico o contraseña son incorrectos');
      
      }  
      
    },err => {
      this.herramientasService.dismissLoading();
    });
    
  }

  async guardarUsuario(user:any){
    this.userService.guardarUsuario(user);
    this.guardarUsuarioWS(user);
  }

  guardarUsuarioWS(user:any){
   
    //se envia los datos del usuario a ws
    this.wsService.loginWS(user.nombreNegocio, user._id, user.imagen).then((res) => {
    
      //se guarda en el storage
      this.userService.guardarStorage();
      this.herramientasService.dismissLoading();
      this.router.navigate(['tab-home']);
    
    }).catch((err) => {
    
      console.log(err);
      this.herramientasService.dismissLoading();
      this.herramientasService.presentAlert('usurio no registrado');
    
    });

  }

  loginFB(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
