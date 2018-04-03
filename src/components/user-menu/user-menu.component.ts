import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { PaginasigninPage } from '../../pages/paginasignin/paginasignin';


@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent {

  @Input('usuario') usuarioAtual: Usuario

  constructor
  (
    public navCtrl: NavController,
    public afa: AngularFireAuth
  ) 
  {   
  }

  onLogout(){
     this.navCtrl.setRoot(PaginasigninPage)
     this.afa.auth.signOut()
  }

}
