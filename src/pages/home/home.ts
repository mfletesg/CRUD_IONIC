import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerProvider } from '../../pages/server'; //Provider para hacer peticiones al servidor

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ServerProvider]
})
export class HomePage {
  List_Users:any;
  constructor(public navCtrl: NavController, public server: ServerProvider) {
    this.getUsers(); //LLamamos a la funcion para obtener todos los empleados
  }

  //Funcion para obener todos los empleados
  getUsers(){
    this.server.ObtenerUsuarios()
    .subscribe(
      data =>{
        this.List_Users =  data.json(); //Obtenemos los datos en json y lo guardamos
      });
  }



}
