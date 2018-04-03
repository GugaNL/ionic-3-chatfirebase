import { Injectable } from '@angular/core';
import { chatmodel } from '../../modelos/chatmodel';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ChatproviderProvider {

  constructor
  (
    public afd: AngularFireDatabase
  ) 
  {
  }

  criaChat(chat: chatmodel, userId1: string, userId2: string): void{
     this.afd.object(`/chats/${userId1}/${userId2}`).set(chat);
  }

  carregaChat(userId1: string, userId2: string){
    return this.afd.object(`/chats/${userId1}/${userId2}`).snapshotChanges()
    .map(action => {
      return action.payload.val()
    })
  }

  carregaChat2(userId1: string, userId2: string){
    return this.afd.list(`/chats/${userId1}/${userId2}`, ref => ref.orderByChild('titulo'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  /*updateChat(chat: Observable<any>, userId1: string, userId2: string){
    this.afd.object(`/chats/${userId1}/${userId2}`).set(chat)
    .then(() => {
      console.log('Foi alterado o chat')
    })
  }*/

  updateChat2(chat: chatmodel, userId1: string, userId2: string){
    this.afd.object(`/chats/${userId1}/${userId2}`).set(chat)
    .then(() => {
      console.log('Foi alterado o chat')
    })
  }

  /*getDeepChat(userId1: string, userId2: string): AngularFireObject<chatmodel>{
    //return <AngularFireObject<any>> this.afd.object(`/chats/${userId1}/${userId2}`);
    return this.afd.object(`/chats/${userId1}/${userId2}`);
  }*/

}
