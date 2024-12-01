import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { Socio } from '../../../../models/cliente/socio';

@Component({
  selector: 'app-cadastro-socio',
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
  templateUrl: './cadastro-socio.component.html',
  styleUrl: './cadastro-socio.component.css'
})
export class CadastroSocioComponent implements OnInit{
  
  socio: Socio = { 
    nome: '',
    endereco: '',
    telefone: '',
    sexo: 'M',
    cpf: '',
    dataNascimento: '',
    numeroInscricao: 0,
    ativo: true
  };
  id!: number;
  tipo!: string;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    ) { }

  ngOnInit(): void {

    // Gera um numero de inscrição
    this.socio.numeroInscricao = this.gerarNumeroInscricao();

    this.route.params.subscribe(params => {

      this.id = +params['id'];
    
      if (this.id) {
        this.clienteService.buscarSocio(this.id).subscribe((socio: Socio) => {
          this.socio = socio;
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

    if( this.socio.nome && this.socio.cpf && this.socio.dataNascimento && this.socio.endereco && this.socio.telefone && this.socio.sexo ) {
      
      if ( this.socio.sexo == 'M' ) {
        this.socio.sexo = 'Masculino'
      } else {
        this.socio.sexo = 'Feminino'
      }

      if (this.id) { // EDITAR SOCIO        

        this.clienteService.editarSocio(this.socio).subscribe({
          next: () => {
            this.router.navigate(['/socio']);
            this.toastrService.success('socio editado com sucesso!')
            console.log('socio atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a socio', err);
          }
        });

      } else { // CRIAR SOCIO
        this.clienteService.criarSocio(this.socio).subscribe({
          next: () => {
            this.router.navigate(['/socio']);
            this.toastrService.success('Socio salvo com sucesso!')
            console.log('Socio salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar socio', err);
          }
        });
      }
    }
  }

  gerarNumeroInscricao(): number {
    return Math.floor(100000000 + Math.random() * 900000000); 
  }
}
