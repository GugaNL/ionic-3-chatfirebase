import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';







@Component({
  selector: 'page-pagina-sign-up',
  templateUrl: 'pagina-sign-up.html',
})
export class PaginaSignUpPage {

  formGroup: FormGroup;  
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userservice: UserService,
    ) {
      let emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        usuario: ['', [Validators.required, Validators.minLength(3)]],
        senha: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.compose([Validators.required, Validators.pattern(emailPattern)])]]
      });
  }
  
  onSubmit(): void{
    this.userservice.criaUsuario(this.formGroup.value)
    this.userservice.criaUsuarioLogin(this.formGroup.value)
    this.navCtrl.push(HomePage)
  }

}
