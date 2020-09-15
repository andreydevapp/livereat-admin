import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HerramientasService } from 'src/app/services/herramientas.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogueoService } from 'src/app/services/logueo.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(private router:Router,
    private herramientas:HerramientasService,
    private userService:UserService,
    private wsService:WebsocketService,
    private registrarseService:RegistrarseService,
    private logueoService:LogueoService) { 
    }

  ngOnInit() {
    
    this.logueoService.cargarStorage();

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
