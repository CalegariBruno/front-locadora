import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Classe } from '../../../models/classe/classe';
import { ClasseService } from '../../../services/classe/classe.service';
import { ToastrService } from 'ngx-toastr';
import { Socio } from '../../../models/cliente/socio/socio';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Cliente } from '../../../models/cliente/cliente';
import { MatSelectModule } from '@angular/material/select';

interface TiposSexo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastro-socio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './cadastro-socio.component.html',
  styleUrl: './cadastro-socio.component.css'
})
export class CadastroSocioComponent implements OnInit {

  socio: Socio = {
    nome: '',
    dataNascimento: '',
    sexo: '',
    ativo: true,
    cpf: '',
    endereco: '',
    telefone: '',
  };
  id!: number;
  tipo!: string;
  tiposSexo: TiposSexo[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Feminino', viewValue: 'Feminino' },
  ];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.id = +params['id'];

      if (this.id) {
        this.clienteService.buscarCliente(this.id).subscribe((cliente: Cliente) => {
          this.socio = cliente as Socio;
        });
      }

    });

    if (this.id) {
      this.tipo = 'Editar'
    } else {
      this.tipo = 'Cadastrar'
    }

  }

  onSubmit(): void {

    if (this.socio.nome && this.socio.dataNascimento && this.socio.sexo && this.socio.cpf && this.socio.endereco && this.socio.telefone) {

      if (this.id) { // EDITAR SOCIO

        this.clienteService.editarSocio(this.socio).subscribe({
          next: () => {
            this.router.navigate(['/socio']);
            this.toastrService.success('Sócio editado com sucesso!')
            console.log('Socio atualizada com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a classe', err);
          }
        });

      } else { // CRIAR SOCIO

        this.clienteService.criarSocio(this.socio).subscribe({
          next: () => {
            this.router.navigate(['/socio']);
            this.toastrService.success('Sócio salvo com sucesso!')
            console.log('socio salva com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar a socio', err);
          }
        });

      }
    }
  }


}
