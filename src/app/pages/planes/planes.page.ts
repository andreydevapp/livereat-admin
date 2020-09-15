import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/services/planes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: -5,
    centeredSlides: true,
    slidesPerView: 1.3
  }

  constructor(private planesService:PlanesService, private router:Router) { }

  ngOnInit() {
  }

  emprendedorSelected(){
    this.planesService.idPlan = '5e8bbd133ced8d39d8d7d9f2';
    this.router.navigate(['/pago-plan']);
  }

  pymeSelected(){
    this.planesService.idPlan = '5e8bbd133ced8d39d8d7d9f3';
    this.router.navigate(['/pago-plan']);
  }

  proSelected(){
    this.planesService.idPlan = '5e8bbd133ced8d39d8d7d9f4';
    this.router.navigate(['/pago-plan']);
  }

  plusSelected(){
    this.planesService.idPlan = '5e8bbd133ced8d39d8d7d9f5';
    this.router.navigate(['/pago-plan']);
  }

}
