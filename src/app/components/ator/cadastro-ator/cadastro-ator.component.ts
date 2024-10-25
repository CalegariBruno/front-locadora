import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

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

export class CadastroAtorComponent implements OnInit {
  
  ator: Ator = { nome: '' }; 
  id!: number;  
  tipo!: string;  

  constructor(
    private atorService: AtorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService 
  ) { }

  ngOnInit(): void {

    // PEGA O ID DA URL
    this.route.params.subscribe(params => {

      this.id = +params['id']; // CONVERTE PARA NUMBER

      if (this.id) {        
        this.atorService.buscarAtor(this.id).subscribe((ator: Ator) => {
          this.ator = ator;
        });
      }

    });

    if(this.id){
      this.tipo = 'Editar'
    }else{
      this.tipo = 'Cadastrar'
    }

  }

  onSubmit(): void {

    if (this.id) { // EDITAR ATOR
      
      this.atorService.editarAtor(this.ator).subscribe({
        next: () => {          
          this.router.navigate(['/ator']);
          this.toastrService.success('Ator editado com sucesso!')
          console.log('Ator atualizado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar o ator', err);
        }
      });

    } else { // CRIAR ATOR
      
      if (this.ator.nome) {
        this.atorService.criarAtor(this.ator).subscribe({
          next: () => {            
            this.router.navigate(['/ator']); 
            this.toastrService.success('Ator salvo com sucesso!')
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
