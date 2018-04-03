import { Usuario } from './../../modelos/usuario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Mensagem } from '../../modelos/mensagem';


@Injectable()
export class UserService {

  private PATH = '/usuarios';
  private PATH2 = '/chats/';

  constructor(
    public http: HttpClientModule,
    public afd: AngularFireDatabase,
    public lc: LoadingController,
    public afa: AngularFireAuth,
  ) {
  }

  criaUsuario(usuario: Usuario): void {
    let loading: Loading = this.exibeLoading('Criando usuario..');
    this.afd.list('/usuarios').push(usuario).then(() => {
      console.log('usuario cadastrado!');
      loading.dismiss();
    });
  }

  criaUsuarioLogin(usuario: Usuario) {
    this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then(() => {
        console.log('conta para login criada');
      })
  }


  listaUsuarios() {
    return this.afd.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  listaChats(uid: string) {
    return this.afd.list(this.PATH2 + uid, ref => ref.orderByChild('titulo'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  

  exibeLoading(texto: string): Loading {
    let loading: Loading = this.lc.create({
      content: texto
    });
    loading.present();
    return loading;
  }


  lerUsuario() {
    this.afa.authState.subscribe(auth => console.log(auth));
  }

  carregaUsuarioRecipienteChat(userId: string) {
    return this.afd.object(`/usuarios/${userId}`)
  }

  getMensagem(usuarioID1: string, usuarioID2: string) {    
    return this.afd.list(`/mensagens/${usuarioID1}-${usuarioID2}`, ref => ref.orderByChild('timeStamp'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  

  /*gravaMensagem(mensagem: Mensagem, listaMensagens: Observable<any>) {
    //return listaMensagens.push(mensagem)      
    this.afd.list('/mensagens').push(listaMensagens).then(() =>{
      console.log('A mensagem foi gravada no banco')
    })
  }*/


  gravaMensagem(usuarioID1: string, usuarioID2: string, mensagem: Mensagem) {
    //this.afd.object(`/mensagens/${usuarioID1}-${usuarioID2}`).set(mensagem);
    this.afd.list(`/mensagens/${usuarioID1}-${usuarioID2}`).push(mensagem).then(() =>{
      console.log('A mensagem foi gravada no banco')
    });
  }


  

}


