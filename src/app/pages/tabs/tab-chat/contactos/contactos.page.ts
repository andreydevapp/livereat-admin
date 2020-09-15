import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  constructor(private wsService:WebsocketService,
    private scrollService:ScrollService,
    public usuarioService:UserService) { }

  usuariosActivosObs: any = [];
  uri = environment.URI;

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

  ngOnInit() {
    console.log('contactos');
    this.wsService.getUsuariosActivos().subscribe(usuarios => {
      this.usuariosActivosObs=usuarios;
      console.log("usuario",this.usuariosActivosObs);
    },err => {

    });
    
    // Emitir el obtenerUsuarios
    this.wsService.emitirUsuariosActivos();
  }


}
