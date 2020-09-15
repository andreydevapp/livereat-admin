import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HerramientasService } from './herramientas.service';
import { WebsocketService } from './websocket.service';
import { RegistrarseService } from './registrarse.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

  private unsubscribe$ = new Subject<void>();

  constructor(private router:Router,
    private herramientas:HerramientasService,
    private userService:UserService,
    private wsService:WebsocketService,
    private registrarseService:RegistrarseService) { 
  }
  
  async cargarStorage(){

    const existe = await this.userService.cargarStorage();

    if (existe) {

      //validamos si el token tiene acceso
      this.validar_token();
      
    }else{

      await this.herramientas.presentAlert('no existe un usuario');
      this.router.navigate(["iniciar-sesion"]);
    
    }

  }

  validar_token(){

    this.registrarseService.protected()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(res => {

      const respuesta:any = res;

      if (respuesta.res === 'protected') {
        //tiene acceso
        this.registrarPorToken();
        
      }else{
        this.router.navigate(["iniciar-sesion"]);
      }

    }, err => {
      console.log(err);
    })

  }

  async registrarPorToken(){

    this.registrarseService.iniciarSesionPorToken()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {

      const user:any = res;

      if (user.res === 'negocio registrado') {

        //se guarda el usuario en la variable de entorno
  
        this.guardarUsuario(res);

        //se envia la informacion del usuario para el servicio de ws
        
      }else{
        this.router.navigate(["iniciar-sesion"]);
      }  

    }, err => {
      console.log(err);
    })
  }

  async guardarUsuario(res:any){
    console.log('guardar usuario');
    await this.userService.guardarUsuario(res);
    this.guardarUsuarioWS();
    
  }

  guardarUsuarioWS(){
  
    const user:any = this.userService.getUsuario(); 
  
    //se envia los datos del usuario a ws
    this.wsService.loginWS(user.nombreNegocio, user.id, user.imagen).then((res) => {
    
      //se guarda en el storage
      this.userService.guardarStorage();
      this.router.navigate(["tab-home"]);
    
    }).catch((err) => {
    
    
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
