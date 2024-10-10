import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cadastro-template',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    RouterLink],
  templateUrl: './cadastro-template.component.html',
  styleUrls: ['./cadastro-template.component.css']
})
export class CadastroTemplateComponent {
  @Input() tipo: string = '';
  @Input() rotaCancelar: string = '';

  nome: string = '';  // Variável para armazenar o valor do input

  onSave() {
    if (this.nome.trim() === '') {
      alert('Por favor, insira o nome do ' + this.tipo);
    } else {
      alert('Cadastro do ' + this.tipo + ' salvo com sucesso!');
      this.nome = '';
    }
  }
}
