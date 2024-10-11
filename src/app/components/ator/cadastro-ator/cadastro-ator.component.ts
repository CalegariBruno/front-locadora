import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';

@Component({
  selector: 'app-cadastro-ator',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    RouterLink],
  templateUrl: './cadastro-ator.component.html',
  styleUrl: './cadastro-ator.component.css'
})

export class CadastroAtorComponent {

  tipo: string = 'Ator';
  ator: Ator = { nome: '' }; 

  constructor(private atorService: AtorService, private router: Router) { }

  onSubmit(): void {
    if (this.ator.nome) {
      this.atorService.criarAtor(this.ator).subscribe({
        next: () => {
          this.router.navigate(['/ator']);
          console.log('Ator salvo com sucesso!');         
        },
        error: (err) => {
          console.error('Erro ao salvar o ator', err);
        }
      });
    }
  }

}
