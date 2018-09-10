import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServerProvider {
  constructor(public http: Http) {
    console.log('Hola desde el provider Serve');
  }


  ObtenerUsuarios(){
    var headers = new Headers(); //Creamos la cabecera
    headers.append('Access-Control-Allow-Origin' , '*'); //Indicamos que vamos hacer peticiones a todas las rutas
    let options = new RequestOptions({ headers:headers, withCredentials: true}); //
    return this.http.get('http://localhost:80/API_REST_Laravel/public/api/user')
    .map(res => res);
  }




}
