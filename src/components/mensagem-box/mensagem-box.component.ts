import { Component, Input } from '@angular/core';
import { Mensagem } from '../../modelos/mensagem';


@Component({
  selector: 'mensagem-box',
  templateUrl: 'mensagem-box.component.html',
  host: {
    '[style.justify-content]' : '((!isRemetente) ? "flex-start" : "flex-end")',
    '[style.text-align]' : '((!isRemetente) ? "left" : "right")'
  }
})

export class MensagemBoxComponent {
  
  @Input() mensagem: Mensagem
  @Input() isRemetente: boolean

  constructor() 
  {
  
  }

}
