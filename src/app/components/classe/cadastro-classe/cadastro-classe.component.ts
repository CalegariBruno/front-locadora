import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Classe } from '../../../models/classe/classe';
import { ClasseService } from '../../../services/classe/classe.service';

@Component({
  selector: 'app-cadastro-classe',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './cadastro-classe.component.html',
  styleUrl: './cadastro-classe.component.css'
})

export class CadastroClasseComponent implements OnInit {

  classe: Classe = {
    nome: '', 
    valor: 0, 
    prazoDevolucao: new Date() 
  };
  id!: number;
  tipo!: string;

  constructor(
    private classeService: ClasseService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {

      this.id = +params['id']; 

      if (this.id) {        
        this.classeService.buscarClasse(this.id).subscribe((classe: Classe) => {
          this.classe = classe;
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

    if (this.classe.nome && this.classe.valor > 0 && this.classe.prazoDevolucao) {

      if (this.id) {
        
        this.classeService.editarClasse(this.classe).subscribe({
          next: () => {
            this.router.navigate(['/classe']); 
            console.log('Classe atualizada com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a classe', err);
          }
        });

      } else { 
        
        this.classeService.criarClasse(this.classe).subscribe({
          next: () => {
            this.router.navigate(['/classe']);
            console.log('Classe salva com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar a classe', err);
          }
        });
        
      }
    }
  }
}
