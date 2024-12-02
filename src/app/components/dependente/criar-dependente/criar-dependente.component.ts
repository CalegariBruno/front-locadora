import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Cliente } from '../../../models/cliente/cliente';
import { Dependente } from '../../../models/cliente/dependente/dependente';
import { Socio } from '../../../models/cliente/socio/socio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-criar-dependente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './criar-dependente.component.html',
  styleUrls: ['./criar-dependente.component.css']
})
export class CadastroDependenteComponent implements OnInit {

  dependente: Dependente = {
    nome: '',
    dataNascimento: '',
    sexo: '',
    ativo: true,
    socio: { id: 0 },
  };
  id!: number;
  tipo!: string;
  sociosList: Socio[] = []

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {

    // Carrega os socios ao iniciar o componente
    this.clienteService.listarDisponiveis().subscribe((socios: Socio[]) => {
      this.sociosList = socios;
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (this.id) {
        this.clienteService.buscarCliente(this.id).subscribe((cliente: Cliente) => {
          this.dependente = cliente as Dependente;
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

    if (this.dependente.nome && this.dependente.dataNascimento && this.dependente.sexo && this.dependente.socio.id > 0) {

      if (this.id) { // EDITAR DEPENDENTE

        this.clienteService.editarDependente(this.dependente).subscribe({
          next: () => {
            this.router.navigate(['/dependente']);
            this.toastrService.success('Dependente editado com sucesso!');
            console.log('Dependente atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar dependente', err);
          }
        });

      } else { // CRIAR DEPENDENTE

        this.clienteService.criarDependente(this.dependente).subscribe({
          next: () => {
            this.router.navigate(['/dependente']);
            this.toastrService.success('Dependente salvo com sucesso!');
            console.log('Dependente salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar dependente', err);
          }
        });

      }
    }
  }

}
