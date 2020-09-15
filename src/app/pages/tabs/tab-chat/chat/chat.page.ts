import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatsObs: any = [];
  uri = environment.URI;
  private unsubscribe$ = new Subject<void>();

  constructor(private chatService:ChatService,
    public wsService:WebsocketService,
    private scrollService:ScrollService,
    private router:Router) { }

  ngOnInit() {
    this.chatService.getChatWsReceptor().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      console.log(res);
      this.chatsObs = res;
    },err => {

    });

    this.chatService.getChatWsEmisor().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      console.log(res);
      this.chatsObs = res;
    },err => {

    });

    this.chatService.getChat().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      console.log(res);
      this.chatsObs = res;
    },err => {

    });
  

  }

  lastX:any
  onScroll(event) {
    if (event.detail.scrollTop > Math.max(0,this.lastX)){
      //subiendo
      this.scrollService.sendScrollChat('subiendo');
    }else{
      //bajandoconsole.log('le estoy enviando el mensaje a tabs components');
      this.scrollService.sendScrollChat('bajando');
    }
     this.lastX = event.detail.scrollTop
  }

  modificarMensajesVistos(_id){

    for (let chat of this.chatsObs) {
      if (chat._id === _id) {

        if (chat.mensajesSinVer > 0) {
          console.log('tengo que modificar a 0');
          chat.mensajesSinVer = 0;
          this.router.navigate(['/mensajes',chat.idUser+'separador'+chat.nombre+'separador'+chat.imagen+'separador'+chat.id_fb]);
        }else{
          this.router.navigate(['/mensajes',chat.idUser+'separador'+chat.nombre+'separador'+chat.imagen+'separador'+chat.id_fb]);
        }
      }
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
