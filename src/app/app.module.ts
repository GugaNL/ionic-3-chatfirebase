import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { PaginaSignUpPage } from '../pages/pagina-sign-up/pagina-sign-up';
import { UserService } from '../providers/user/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { PaginasigninPage } from '../pages/paginasignin/paginasignin';
import { PaginachatPage } from '../pages/paginachat/paginachat';
import { ChatproviderProvider } from '../providers/chatprovider/chatprovider';
import { MensagemBoxComponent } from '../components/mensagem-box/mensagem-box.component';
import { UsuarioInfoComponent } from '../components/usuario-info/usuario-info.component';
import { UserMenuComponent } from '../components/user-menu/user-menu.component';


const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCu-NKTFys-pHDibE4rL4qlNK6HLgf5S0c",
  authDomain: "ionic-firebase-chat-v2.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-v2.firebaseio.com",
  projectId: "ionic-firebase-chat-v2",
  storageBucket: "",
  messagingSenderId: "318664095913"
};




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PaginaSignUpPage,
    PaginasigninPage,
    PaginachatPage,
    MensagemBoxComponent,
    UsuarioInfoComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PaginaSignUpPage,
    PaginasigninPage,
    PaginachatPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    HttpClientModule,
    AngularFireDatabase,
    AngularFireAuthModule,
    AngularFireAuth,
    ChatproviderProvider
  ]
})
export class AppModule {}
