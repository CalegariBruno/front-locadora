import { Component } from '@angular/core';
import { Locacao, LocacaoList } from '../../../../models/locacao/locacao';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocacaoService } from '../../../../services/locacao/locacao.service';
import { DialogExcluirComponent } from '../../../dialog-excluir/dialog-excluir.component';

@Component({
  selector: 'app-listagem-locacao',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listagem-locacao.component.html',
  styleUrl: './listagem-locacao.component.css'
})
export class ListagemLocacaoComponent {
  locacoes: LocacaoList[] = [];
  displayedColumns: string[] = ['cliente', 'item', 'valor',  'dtPrevista', 'devolucao', 'acoes'];

  constructor(
    private locacaoService: LocacaoService, 
    private dialog: MatDialog, 
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.exibirLocacoes();
  }

  exibirLocacoes(): void {
    this.locacaoService.listarLocacoes().subscribe(
      (data: LocacaoList[]) => {
        this.locacoes = data;
        console.log(this.locacoes); 
      },
      (error) => {        
        console.error('Erro ao carregar a lista de locacoes', error);
      }      
    );
  }

  excluirLocacao(locacao: Locacao) {
    this.locacaoService.deletarLocacao(locacao.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Locação excluído com sucesso!')
        this.locacoes = this.locacoes.filter(c => c.id !== locacao.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar locação', err);
      }           
    });
  }

  openDialog(locacao: Locacao): void{
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirLocacao(locacao);        
      }
    });
  }
}
