import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  @Input() estadoActual:string;
  @Input() accesibilidadActual:string;
  nuevoEstado:string = '';

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    console.log("El estado es",this.estadoActual);
    if (this.estadoActual === 'En Stock') {
      this.nuevoEstado = "Agotado";
    }else{
      this.nuevoEstado = "En Stock"
    }
  }

  opcion(opc:string,estadoActual?:number){

    this.popoverController.dismiss({
      opcQuery:opc,
      estadoActual
    });

  }

}
