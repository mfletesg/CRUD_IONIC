import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerProvider } from '../../pages/server'; //Provider para hacer peticiones al servidor
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ServerProvider]
})
export class HomePage {
  List_Users:any;
  user = {}; //Objeto usuario
  constructor(public navCtrl: NavController, public server: ServerProvider, public alertCtrl: AlertController) {
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


  //Función para crear el usuario
  CrearUsuario() {
    var name = this.user['name']; //Guardamos el nombre del usuario que se capturo y el email
    var email = this.user['email'];
    this.server.NuevoUsuario(this.user).subscribe(
      res => {
        console.log(res);
        this.getUsers(); //Actuaizamos la lista de los empleados
      }
    );

  }

  //Funcion para obtener el id del usuario
  BuscarUsuario(id){
    this.server.BuscarUsuarioID(id).subscribe(
      res => {
        console.log(res.json());
        this.showPrompt(res.json());
      }
    );
  }
  showPrompt(res) {
    var datos = res.datos;
    var id_user;
    var name;
    var email;
    for (let i = 0; i < datos.length; i++) {
        id_user = datos[i]['id'];
        name = datos[i]['name'];
        email = datos[i]['email'];
        break;
    }
    const prompt = this.alertCtrl.create({
      title: 'Editar Usuario',
      message: "Nombre",
      inputs: [
        {
          label: 'Nombre',
          name: 'name',
          placeholder: 'Nombre del Usuario',
          value: name,
          type: 'text',
        },
        {
          label: 'Correo',
          name: 'email',
          placeholder: 'Correo del Usuario',
          value: email,
          type: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            data.id = id_user;
            console.log(data);
            this.server.ActualizarUsuario(data).subscribe(res => {
              console.log(res);
              this.getUsers();
            })
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



  //Funcion para eliminar los usuario
  EliminarUsuario(id){
    this.server.EliminarUsuarioID(id).subscribe(
      res => {
        this.getUsers();
      }
    );
  }

}
