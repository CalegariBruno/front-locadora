import { Component } from '@angular/core';
import { CadastroTemplateComponent } from "../cadastro-template/cadastro-template.component";

@Component({
  selector: 'app-cadastro-classe',
  standalone: true,
  imports: [CadastroTemplateComponent],
  templateUrl: './cadastro-classe.component.html',
  styleUrl: './cadastro-classe.component.css'
})
export class CadastroClasseComponent {

}
