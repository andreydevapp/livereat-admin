import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, http_planes } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http:HttpClient) { }

  idPlan:string = '';

  getPlan(){
    const idPlan= {idPlan:this.idPlan}
    return this.http.post(environment.URI+http_planes.getPlan, idPlan);
  }

}
