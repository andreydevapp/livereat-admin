import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/services/planes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-plan',
  templateUrl: './pago-plan.page.html',
  styleUrls: ['./pago-plan.page.scss'],
})
export class PagoPlanPage implements OnInit {

  constructor(private planesService: PlanesService, private router:Router) { }

  plan:any = [];

  yearCheck = false;
  biannualCheck = false;
  monthCheck = false;
  datosCargados = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    
    this.planesService.getPlan().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.plan = res;
      console.log(this.plan.res);
      this.datosCargados = true;
    }, err => {
      console.log(err);
    });

  }

  proSelected(){
    this.router.navigate(["registrar-negocio"]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
    console.log('desuscrito');
  }

}
