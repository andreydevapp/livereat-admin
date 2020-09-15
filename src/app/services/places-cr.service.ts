import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment,http_placesCr_method } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlacesCrService {

  constructor(private http:HttpClient) { }

  getProvincias(){
    return this.http.post(http_placesCr_method.URI+http_placesCr_method.getProvincias,{id:""});
  }

  getCantones(idProvincia){
    return this.http.post(http_placesCr_method.URI+http_placesCr_method.getCantones,{idProvincia});
  }

  getDistritos(idProvincia,idCanton){
    return this.http.post(http_placesCr_method.URI+http_placesCr_method.getDitritos,{idProvincia,idCanton});
  }
}
