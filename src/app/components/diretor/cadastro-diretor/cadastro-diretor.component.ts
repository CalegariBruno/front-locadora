import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Diretor } from '../../../models/diretor/diretor';
import { DiretorService } from '../../../services/diretor/diretor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-diretor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './cadastro-diretor.component.html',
  styleUrl: './cadastro-diretor.component.css'
})

export class CadastroDiretorComponent implements OnInit {

  diretor: Diretor = { nome: '' };
  id!: number;
  tipo!: string;

  constructor(
    private diretorService: DiretorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.id = +params['id'];

      if (this.id) {
        this.diretorService.buscarDiretor(this.id).subscribe((diretor: Diretor) => {
          this.diretor = diretor;
        })
      }

    })

    if(this.id){
      this.tipo = 'Editar'
    }else{
      this.tipo = 'Cadastrar'
    }
    
  }

  onSubmit(): void {

    if (this.id) { // EDITAR DIRETOR

      this.diretorService.editarDiretor(this.diretor).subscribe({
        next: () => {
          this.router.navigate(['/diretor']);
          this.snackBar.open('Diretor atualizado com sucesso!', 'Fechar', {
            duration: 5000,
          });
          console.error('Diretor atualizado com sucesso!');
        },
        error: (err) => {
          console.error('erro',err);
        }
      })

    }else{ // CRIAR DIRETOR

      if (this.diretor.nome) {
        this.diretorService.criarDiretor(this.diretor).subscribe({
          next: () => {
            this.router.navigate(['/diretor']);
            this.snackBar.open('Diretor salvo com sucesso!', 'Fechar', {
              duration: 5000,
            });
            console.log('Ator salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar o ator', err);
          }
        });
      }

    }    
  }
}
