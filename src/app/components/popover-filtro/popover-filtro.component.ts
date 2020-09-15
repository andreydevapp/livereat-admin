import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-filtro',
  templateUrl: './popover-filtro.component.html',
  styleUrls: ['./popover-filtro.component.scss'],
})
export class PopoverFiltroComponent implements OnInit {

  @Input() encabezado:string;
  @Input() tipoFiltro:string;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  opcion(encabezado:string, tipoFiltro:number){
    console.log('item',encabezado);

    this.popoverController.dismiss({
      encabezado,
      tipoFiltro
    });

  }

}
