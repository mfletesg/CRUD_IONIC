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

  NuevoUsuario(item):any{
    let headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(
      'http://localhost:80/API_REST_Laravel/public/api/user/create',
      JSON.stringify(item), {headers: headers}
    )
    .map(res => res);

  }

  //Buscamos el usuario por su id
  BuscarUsuarioID(id):any{
    let headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(
      'http://localhost:80/API_REST_Laravel/public/api/user/search',
      JSON.stringify(id), {headers: headers}
    )
    .map(res => res);
  }


  //Actualizamos el usuario
  ActualizarUsuario(data):any{
  let headers = new Headers({'Content-Type' : 'application/json'});
  return this.http.post(
    'http://localhost:80/API_REST_Laravel/public/api/user/update',
    JSON.stringify(data), {headers: headers}
  )
  .map(res => res);
  }


  //Eliminamos el usuario
  EliminarUsuarioID(id):any{
    let headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(
      'http://localhost:80/API_REST_Laravel/public/api/user/delete',
      JSON.stringify(id), {headers: headers}
    )
    .map(res => res);
  }




}
