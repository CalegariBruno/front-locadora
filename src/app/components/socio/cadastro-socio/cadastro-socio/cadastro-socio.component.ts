import { Component, OnInit } from '@angular/core';
import { Socio } from '../../../../models/socio/socio';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocioService } from '../../../../services/socio/socio.service';
import { TituloService } from '../../../../services/titulo/titulo.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

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
    endereco: {
      bairro: '',
      rua: '',
      numero: 0
    },
    telefone: '',
    sexo: 'M',
    cpf: '',
    dataNasc: ''
  };
  id!: number;
  tipo!: string;

  constructor(
    private socioService: SocioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private tituloService: TituloService, 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.id = +params['id'];

      if (this.id) {
        this.socioService.buscarSocio(this.id).subscribe((socio: Socio) => {
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

    if (this.socio.nome && this.socio.endereco && this.socio.telefone && this.socio.cpf && this.socio.sexo && this.socio.dataNasc) {

      if (this.id) { // EDITAR socio        

        this.socioService.editarSocio(this.socio).subscribe({
          next: () => {
            this.router.navigate(['/socio']);
            this.toastrService.success('socio editado com sucesso!')
            console.log('socio atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a socio', err);
          }
        });

      } else { // CRIAR socio

        this.socioService.criarSocio(this.socio).subscribe({
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

}
