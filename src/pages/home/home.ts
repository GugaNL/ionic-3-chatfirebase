import { chatmodel } from './../../modelos/chatmodel';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { PaginasigninPage } from '../paginasignin/paginasignin';
import { PaginachatPage } from '../paginachat/paginachat';
import { Usuario } from '../../modelos/usuario';
import { ChatproviderProvider } from '../../providers/chatprovider/chatprovider';
import * as firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios: Observable<any>
  visao: string = "chats"
  chats: Observable<any>
  usuario: Usuario

  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public afd: AngularFireDatabase,
    public afa: AngularFireAuth,
    public chatp: ChatproviderProvider,
  ) {
    /*this.usuarios = this.userservice.listaUsuarios();    
    this.afa.authState.subscribe(auth => {
      this.chats = this.userservice.listaChats(auth.uid);
    })*/
  }

  ionViewDidLoad(){
    this.usuarios = this.userservice.listaUsuarios();    
    this.afa.authState.subscribe(auth => {
      this.chats = this.userservice.listaChats(auth.uid);
    })
  }

  /*filtroContato(event: any): void{
    let contatoPesquisa: string = event.target.value
    this.usuarios = this.userservice.listaUsuarios();
    this.afa.authState.subscribe(auth => {
      this.chats = this.userservice.listaChats(auth.uid);
    })
    if(contatoPesquisa){
      switch(this.visao){
        case 'contatos':
        this.usuarios = this.usuarios.map((usuarios: Usuario[]) => {
          return usuarios.filter((usuario: Usuario) => {
            return ((usuario.nome.toLowerCase().indexOf(contatoPesquisa.toLowerCase()) > -1 ))
          })
        })
        break
        case 'chats':
        this.chats = this.chats.map((chats: chatmodel[]) => {
          return chats.filter((chat: chatmodel) => {
            return ((chat.titulo.toLowerCase().indexOf(contatoPesquisa.toLowerCase()) > -1 ))
          })
        })
        break
      }
    }
  }*/

  logout() {
    //this.afa.auth.signOut();    
    this.navCtrl.setRoot(PaginasigninPage);    
  }



  paginaChat(usuario: Usuario): void {
    let usuarioUID = this.afa.auth.currentUser.uid
    let loginEmail = this.afa.auth.currentUser.email
    let conversa: any[] = []
    let hora: Object = firebase.database.ServerValue.TIMESTAMP

    this.afd.object(`/chats/${usuarioUID}/${usuario.key}`).snapshotChanges()
      .map(action => {
        const data = action.payload.toJSON()
        if (data == null) {
          let chat1 = new chatmodel(' ', hora, usuario.email, 'Conversa')
          this.chatp.criaChat(chat1, usuarioUID, usuario.key)

          let chat2 = new chatmodel(' ', hora, loginEmail, 'Conversa')
          this.chatp.criaChat(chat2, usuario.uid, usuarioUID)

          console.log('Nao existe o chat no banco, foi criado')
        } else {
          console.log('Faz nada, ja existe a conversa no banco')
          return data
        }
      })
      .subscribe(result => {
        if (result != null) {
          Object.keys(result)
            .map(key => {
              conversa.push({ 'key': key, 'data': result[key] })
              //console.log('lista: ', listings)
            })
        }
      })


    this.navCtrl.push(PaginachatPage, {
      UsuarioRecipiente: usuario
    })
  }


  abreChatExistente(chat: chatmodel): void {
    let userRecID = chat.key
    this.afd.object(`/usuarios/${userRecID}`).snapshotChanges()
      .map(action => {
        const data = action.payload.toJSON()        
        if (data != null) {
          return data
        } 
      }).subscribe((result: Usuario) => {
        if(result != null){
          this.navCtrl.push(PaginachatPage, {
            UsuarioRecipiente: result
          })
        }
      })
  }



}


















