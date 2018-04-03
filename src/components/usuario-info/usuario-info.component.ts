import { Component, Input } from '@angular/core';
import { Usuario } from '../../modelos/usuario';


@Component({
  selector: 'usuario-info',
  templateUrl: 'usuario-info.component.html'
})
export class UsuarioInfoComponent {

  @Input() usuario: Usuario
  @Input() isMenu: boolean = false

  constructor() 
  {
    
  }

}
