import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';
import { DialogExcluirComponent } from '../../dialogs/dialog-excluir/dialog-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-de-atores',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,],
  templateUrl: './listagem-de-atores.component.html',
  styleUrl: './listagem-de-atores.component.css'
})

export class ListagemDeAtoresComponent implements OnInit {

  atores: Ator[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(
    private atorService: AtorService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.exibirAtores();
  }

  exibirAtores(): void {
    this.atorService.listarAtores().subscribe(
      (data: Ator[]) => {
        this.atores = data;
        console.log(this.atores);
      },
      (error) => {
        console.error('Erro ao carregar a lista de atores', error);
      }
    );
  }

  excluirAtor(ator: Ator) {
    this.atorService.deletarAtor(ator.id!).subscribe({
      next: () => {
        this.toastrService.success('Ator excluído com sucesso!')
        this.atores = this.atores.filter(c => c.id !== ator.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar o ator', err);
      }
    });
  }

  openDialog(ator: Ator): void {
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirAtor(ator);
      }
    });
  }
}