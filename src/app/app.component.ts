import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebsocketService } from './services/websocket.service';
import { UserService } from './services/user.service';
import { PushService } from './services/push.service';
import { LogueoService } from './services/logueo.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public datosCargados = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public wsService: WebsocketService,
    private pushService:PushService,
    private router:Router,
    private menu: MenuController,
    public userService:UserService
  ) {
    this.initializeApp();
    userService.getloadData().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      const data:any = res;
      this.datosCargados = data.loadData; 
      console.log(res)
    },err => {

    });
  }

  async loadData(){
    const storage = await this.userService.cargarStorage();
    this.loadData();
    if (storage) {
      this.datosCargados = true;
    }
  }  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.configuracionInicial();
      
    });
  }

  go(ir){
    this.router.navigate([ir]);
    this.menu.enable(true, 'menu');
    this.menu.close('menu');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
