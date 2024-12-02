import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Dependente } from '../../../models/cliente/dependente/dependente';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { DialogExcluirComponent } from '../../dialogs/dialog-excluir/dialog-excluir.component';
import { DialogAtivarDesativarComponent } from '../../dialogs/dialog-status/dialog-status.component';

@Component({
  selector: 'app-listagem-dependentes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listagem-dependentes.component.html',
  styleUrls: ['./listagem-dependentes.component.css']
})
export class ListagemDependentesComponent implements OnInit {

  dependentes: Dependente[] = [];
  displayedColumns: string[] = ['nome', 'socio' ,'status', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.exibirDependentes();
  }

  exibirDependentes(): void {
    this.clienteService.listarDependentes().subscribe(
      (data: Dependente[]) => {
        this.dependentes = data;
        console.log(this.dependentes); // lembrar de tirar
      },
      (error) => {
        console.error('Erro ao carregar a lista de dependentes', error);
      }
    );
  }

  // EXCLUIR DEPENDENTE

  excluirDependente(dependente: Dependente) {
    this.clienteService.deletarDependente(dependente.id!).subscribe({
      next: () => {
        this.toastrService.success('Dependente excluído com sucesso!');
        this.dependentes = this.dependentes.filter(d => d.id !== dependente.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar dependente', err);
      }
    });
  }

  openDialogExcluir(dependente: Dependente): void {
    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirDependente(dependente);
      }
    });
  }

  // ATIVAR/DESATIVAR DEPENDENTE

  openDialogStatus(dependente: Dependente, acao: 'ativar' | 'desativar'): void {
    const dialogRef = this.dialog.open(DialogAtivarDesativarComponent, {
      data: {
        nome: dependente.nome,
        acao: acao === 'ativar' ? 'ativar' : 'desativar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.alterarStatusDependente(dependente, acao === 'ativar');
      }
    });
  }

  alterarStatusDependente(dependente: Dependente, ativar: boolean): void {
    dependente.ativo = ativar;
    this.clienteService.mudarStatusDependente(dependente.id!).subscribe({
      next: () => {
        this.toastrService.success(
          `Dependente ${ativar ? 'ativado' : 'desativado'} com sucesso!`
        );
        this.exibirDependentes();
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error(err);
      },
    });
  }
}
