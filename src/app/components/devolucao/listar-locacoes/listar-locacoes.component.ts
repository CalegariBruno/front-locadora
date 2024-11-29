import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';
import { DialogExcluirComponent } from '../../dialog-excluir/dialog-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Locacao } from '../../../models/locacao/locacao';
import { LocacaoService } from '../../../services/locacao/locacao.service';

@Component({
  selector: 'app-listar-locacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listar-locacoes.component.html',
  styleUrl: './listar-locacoes.component.css'
})

export class ListarLocacoesComponent implements OnInit{

  locacoes: Locacao[] = [];
  displayedColumns: string[] = ['cliente', 'item', 'valor',  'dt_devolucao', 'pago', 'devolucao', 'acoes'];


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
      (data: Locacao[]) => {
        this.locacoes = data;
        console.log(this.locacoes);
      },
      (error) => {
        console.error('Erro ao carregar a lista de locações', error);
      }
    );
  }

  excluirLocacao(locacao: Locacao) {
    this.locacaoService.deletarLocacao(locacao.id!).subscribe({
      next: () => {
        this.toastrService.success('Locação excluída com sucesso!')
        this.locacoes = this.locacoes.filter(c => c.id !== locacao.id);
      },
      error: (error) => {
        console.error('Erro ao excluir a locação', error);
      }
    });
  }

  openDialog(locacao: Locacao): void {
    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirLocacao(locacao);
      }
    });
  }
}
