import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PaginasigninPage } from '../pages/paginasignin/paginasignin';
import { Usuario } from '../modelos/usuario';
import { UserService } from '../providers/user/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PaginasigninPage;
  usuarioAtual: Usuario
  

  constructor
  (
    userService: UserService,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public afd: AngularFireDatabase,
    public afa: AngularFireAuth
  ) 
  {   

    this.initializeApp();    
  }

  initializeApp() {
    this.platform.ready().then(() => {      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {    
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(PaginasigninPage);
    //this.afa.auth.signOut();
  }

}
