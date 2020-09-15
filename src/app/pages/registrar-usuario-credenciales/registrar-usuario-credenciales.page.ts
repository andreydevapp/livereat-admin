import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HerramientasService } from 'src/app/services/herramientas.service';

@Component({
  selector: 'app-registrar-usuario-credenciales',
  templateUrl: './registrar-usuario-credenciales.page.html',
  styleUrls: ['./registrar-usuario-credenciales.page.scss'],
})
export class RegistrarUsuarioCredencialesPage implements OnInit {

  constructor(private herramientas:HerramientasService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    const datosReceptor = this.activateRoute.snapshot.paramMap.get('id');
    const split = datosReceptor.split('s3p4r4r');
    this.nombre = split[0]+' '+split[1];
    this.cedula = parseInt(split[2]);
    this.fechaNaci = new Date(split[3]);
    console.log(this.fechaNaci);
  }

  nombre = '';
  apellido ='';
  cedula:number;
  fechaNaci:Date;

  correo:string = '';
  pass:string = '';
  pass2:string = '';

  validar(){

    if (this.correo !== '' && this.pass !== '' && this.pass2 !== '') {
      if (this.pass === this.pass2) {
        this.router.navigate(['registrar-negocio',

        this.nombre
        +'s3p4r4r'+
        this.apellido
        +'s3p4r4r'+
        this.cedula
        +'s3p4r4r'+
        this.correo
        +'s3p4r4r'+
        this.pass
        +'s3p4r4r'+
        this.fechaNaci

      ]);
      }else{
        this.herramientas.presentAlert('Las contraseñas no cohiciden');
      }
    }else{
      this.herramientas.presentAlert('Es necesario llenar todos los campos');
    }

  }

}
