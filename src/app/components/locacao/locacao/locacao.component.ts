import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Locacao } from '../../../models/locacao/locacao';
import { Cliente } from '../../../models/cliente/cliente';
import { ToastrService } from 'ngx-toastr';
import { LocacaoService } from '../../../services/locacao/locacao.service';
import { ItemList } from '../../../models/item/item';
import { ItemService } from '../../../services/item/item.service';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-locacao',
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
  templateUrl: './locacao.component.html',
  styleUrl: './locacao.component.css'
})
export class LocacaoComponent {

  locacao: Locacao = {
    item: { id: 0 },
    cliente: { id: 0 },
    valor: 0,
    dtPrevista: '',
    pago: true
  }
  id!: number;
  tipo!: string;
  itemsList: ItemList[] = []; 
  clientesList: Cliente[] = [];

  constructor( 
    private locacaoService: LocacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private itemService: ItemService,
    private clienteService: ClienteService, 
  ) { }

  ngOnInit(): void {

    // Carrega os items ao iniciar o componente
    this.itemService.listarItens().subscribe((items: ItemList[]) => {
      this.itemsList = items;
    });

    // Carrega os clientes ao iniciar o componente
    this.clienteService.listarClientes().subscribe((clientes: Cliente[]) => {
      this.clientesList = clientes;
    });

    // PEGA O ID DA URL
    this.route.params.subscribe(params => {

      this.id = +params['id']; // CONVERTE PARA NUMBER

      if (this.id) {
        this.locacaoService.buscarLocacao(this.id).subscribe((locacao: Locacao) => {
          this.locacao = locacao;
        });
         this.tipo = 'Editar'
      } else {
        this.tipo = 'Cadastrar'
      }

    }); 

  }

  onSubmit(): void {    

    if ( this.locacao.item.id > 0 && this.locacao.cliente.id > 0 && this.locacao.valor && this.locacao.dtPrevista ) {

      if (this.id) { // EDITAR locacao        

        this.locacaoService.editarLocacao(this.locacao).subscribe({
          next: () => {
            this.router.navigate(['/locacao']);
            this.toastrService.success('locacao editado com sucesso!')
            console.log('locacao atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a locacao', err);
          }
        });

      } else { // CRIAR locacao

        this.locacaoService.criarLocacao(this.locacao).subscribe({
          next: () => {
            this.router.navigate(['/locacao']);
            this.toastrService.success('locacao salvo com sucesso!')
            console.log('locacao salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar locacao', err);
          }
        });
      }
    }
  }

}  
