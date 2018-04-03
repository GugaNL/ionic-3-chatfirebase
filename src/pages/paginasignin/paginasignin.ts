import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaginaSignUpPage } from '../pagina-sign-up/pagina-sign-up';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../modelos/usuario';
import { HomePage } from '../home/home';
import { Loading } from 'ionic-angular/components/loading/loading';
import { UserService } from '../../providers/user/user.service';


@Component({
  selector: 'page-paginasignin',
  templateUrl: 'paginasignin.html',
})
export class PaginasigninPage {
  formGroupSignIn: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public fireauth: AngularFireAuth,
    public userservice: UserService
  ) {
    let emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.formGroupSignIn = this.formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailPattern)])]]
    });
  }

  onSubmit() {
    let user: Usuario;
    user = this.formGroupSignIn.value;
    //this.login(user)
    this.logar(user);
  }

  abrePaginaSignUp() {
    this.navCtrl.push(PaginaSignUpPage)
  }

  

  async logar(usuario: Usuario) {
    let loading: Loading = this.userservice.exibeLoading('Verificando usuario..');
    await this.fireauth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha)
      .then((estaLogado: boolean) => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }).catch((error: any) => {
        loading.dismiss();
        console.log(error);
      });
  }



}
