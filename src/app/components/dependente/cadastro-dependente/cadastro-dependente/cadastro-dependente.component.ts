import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dependente } from '../../../../models/cliente/dependente';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { Socio } from '../../../../models/cliente/socio';

@Component({
  selector: 'app-cadastro-dependente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatRadioModule,
  ],
  templateUrl: './cadastro-dependente.component.html',
  styleUrl: './cadastro-dependente.component.css'
})
export class CadastroDependenteComponent {

  dependente: Dependente = {
    nome: '',
    dataNascimento: '',
    sexo: '',
    socio: {id: 0 },
    numeroInscricao: 0,
    ativo: true
  };
  id!: number;
  tipo!: string;
  sociosList: Socio[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    ) { }

    ngOnInit(): void {

      // Carrega socios
      this.clienteService.listarSocios().subscribe((socios) => {
        this.sociosList = socios;
      });

      // Gera um numero de inscrição
      this.dependente.numeroInscricao = this.gerarNumeroInscricao();

      this.route.params.subscribe(params => {
  
        this.id = +params['id'];
      
        if (this.id) {
          this.clienteService.buscarDependente(this.id).subscribe((dependente: Dependente) => {
            this.dependente = dependente;
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

      if( this.dependente.nome && this.dependente.dataNascimento && this.dependente.sexo && this.dependente.socio) {
        
        if ( this.dependente.sexo == 'M' ) {
          this.dependente.sexo = 'Masculino'
        } else {
          this.dependente.sexo = 'Feminino'
        }

        if (this.id) { // EDITAR dependente        
  
          this.clienteService.editarDependente(this.dependente).subscribe({
            next: () => {
              this.router.navigate(['/dependente']);
              this.toastrService.success('dependente editado com sucesso!')
              console.log('dependente atualizado com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao atualizar a dependente', err);
            }
          });
  
        } else { // CRIAR dependente
          this.clienteService.criarDependente(this.dependente).subscribe({
            next: () => {
              this.router.navigate(['/dependente']);
              this.toastrService.success('Dependente salvo com sucesso!')
              console.log('Dependente salvo com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao salvar dependente', err);
            }
          });
        }
      }
    }

    gerarNumeroInscricao(): number {
      return Math.floor(100000000 + Math.random() * 900000000); 
    }
}
