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
import { Locacao } from '../../../models/locacao/locacao';
import { LocacaoService } from '../../../services/locacao/locacao.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Cliente } from '../../../models/cliente/cliente';
import { ItemService } from '../../../services/item/item.service';
import { Item, ItemList } from '../../../models/item/item';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registrar-locacao',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,    
  ],
  templateUrl: './registrar-locacao.component.html',
  styleUrl: './registrar-locacao.component.css'
})

export class RegistrarLocacaoComponent implements OnInit {

  locacao: Locacao = { dtDevolucaoEfetiva: '', valorCobrado: 0, cliente: { id: 0 }, item: { id: 0 } };
  id!: number;
  tipo!: string;
  clientesList: Cliente[] = [];
  itensList: ItemList[] = [];

  constructor(
    private locacaoService: LocacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private clienteService: ClienteService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {

    // Carregar os clientes
    this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientesList = clientes;
    });

    // Carregar os itens
    this.itemService.listarItens().subscribe((itens) => {
      this.itensList = itens;
    });

    // PEGA O ID DA URL
    this.route.params.subscribe(params => {

      this.id = +params['id']; // CONVERTE PARA NUMBER

      if (this.id) {
        this.locacaoService.buscarLocacao(this.id).subscribe((locacao: Locacao) => {
          this.locacao = locacao;
        });
      }

    });

    if (this.id) {
      this.tipo = 'Editar'
    } else {
      this.tipo = 'Cadastrar'
    }

  }

  // Função para recarregar a página e resetar os dados
  recarregarPagina(): void {
    window.location.reload();  // Recarrega a página e os dados
  }

  onSubmit(): void {

    if (this.id) {// EDITAR LOCACAO
      this.locacaoService.editarLocacao(this.locacao, this.id).subscribe({
        next: () => {
          this.router.navigate(['/devolucao']);
          this.toastrService.success('Locação editada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao editar locação!', err);
        }
      });
    } else {// CRIAR LOCACAO

      // VERIFICA SE O CLIENTE E O ITEM FORAM SELECIONADOS
      if (this.locacao.item.id > 0 && this.locacao.cliente!.id > 0) {
        this.locacaoService.criarLocacao(this.locacao).subscribe({
          next: () => {
            this.toastrService.success('Locação criada com sucesso!');
            this.router.navigate(['/locacao']);
          },
          error: (err) => {
            console.error('Erro ao criar locação!', err);
          }
        });
      }
    }
  }
}
