import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './../../providers/user/user.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';
import { Mensagem } from '../../modelos/mensagem';
import * as firebase from 'firebase';
import { ChatproviderProvider } from './../../providers/chatprovider/chatprovider';
import { chatmodel } from '../../modelos/chatmodel';


@Component({
  selector: 'page-paginachat',
  templateUrl: 'paginachat.html',
})
export class PaginachatPage {

  @ViewChild(Content) content: Content
  mensagens: Observable<any>;
  remetenteID: string;
  destinatario: Usuario;
  titulo: string;
  chat: Observable<any>


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public chatProvider: ChatproviderProvider,
    public afa: AngularFireAuth
  ) {
  }

  ionViewDidLoad() {
    this.destinatario = this.navParams.get('UsuarioRecipiente');
    this.titulo = this.destinatario.nome;
    this.remetenteID = this.afa.auth.currentUser.uid

    this.chat = this.chatProvider.carregaChat2(this.remetenteID, this.destinatario.uid)
    
    let doSubscription = () => {
      this.mensagens.subscribe((mensagens: Mensagem[]) => {
        this.scrollToBottom()
      })
    }

    this.mensagens = this.userService.getMensagem(this.remetenteID, this.destinatario.uid)
    doSubscription()
    /*this.mensagens.subscribe((mensagens: Mensagem[]) => {
      if (mensagens.length === 0) {
        this.mensagens = this.userService
          .getMensagem(this.destinatario.uid, this.remetenteID)
      }
    })*/
  }

  enviaMensagem(newMessage: string): void {
    if (newMessage) {
      let hora: Object = firebase.database.ServerValue.TIMESTAMP
      let mensagem: Mensagem = new Mensagem(this.remetenteID, newMessage, hora)
      this.userService.gravaMensagem(this.remetenteID, this.destinatario.uid, mensagem)
      let chat1: chatmodel = new chatmodel(newMessage, hora, this.destinatario.email, '')
      this.chatProvider.updateChat2(chat1, this.remetenteID, this.destinatario.uid)
    }
  }

  private scrollToBottom(duracao?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duracao || 300)
      }
    }, 50)
  }






}




