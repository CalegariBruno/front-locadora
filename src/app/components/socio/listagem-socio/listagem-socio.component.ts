import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ClasseService } from '../../../services/classe/classe.service';
import { Classe } from '../../../models/classe/classe';
import { RouterLink } from '@angular/router';
import { DialogExcluirComponent } from '../../dialogs/dialog-excluir/dialog-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Socio } from '../../../models/cliente/socio/socio';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { DialogAtivarDesativarComponent } from '../../dialogs/dialog-status/dialog-status.component';

@Component({
  selector: 'app-listagem-socio',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listagem-socio.component.html',
  styleUrl: './listagem-socio.component.css'
})
export class ListagemSocioComponent implements OnInit {

  socios: Socio[] = [];
  displayedColumns: string[] = ['nome', 'status', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.exibirSocios();
  }

  exibirSocios(): void {
    this.clienteService.listarSocios().subscribe(
      (data: Socio[]) => {
        this.socios = data;
        console.log(this.socios); // lembrar de tirar
      },
      (error) => {
        console.error('Erro ao carregar a lista de socios', error);
      }
    );
  }

  // EXCLUIR SOCIO

  excluirSocio(socio: Socio) {
    this.clienteService.deletarSocio(socio.id!).subscribe({
      next: () => {
        this.toastrService.success('Cliente excluído com sucesso!')
        this.socios = this.socios.filter(c => c.id !== socio.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar cliente', err);
      }
    });
  }

  openDialog(socio: Socio): void {
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirSocio(socio);
      }
    });
  }

  // =====


  // ATIVAR/DESATIVAR SOCIO

  openDialogStatus(socio: Socio, acao: 'ativar' | 'desativar'): void {
    const dialogRef = this.dialog.open(DialogAtivarDesativarComponent, {
      data: {
        nome: socio.nome,
        acao: acao === 'ativar' ? 'ativar' : 'desativar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.alterarStatusSocio(socio, acao === 'ativar');
      }
    });
  }

  alterarStatusSocio(socio: Socio, ativar: boolean): void {
    socio.ativo = ativar;
    this.clienteService.mudarStatusSocio(socio.id!).subscribe({
      next: () => {        
        this.toastrService.success(
          `Sócio ${ativar ? 'ativado' : 'desativado'} com sucesso!`
        );
        this.exibirSocios();
      },
      error: (err) => {
        this.toastrService.error('Erro ao alterar o status do sócio.');
        console.error(err);
      },
    });
  }


}
