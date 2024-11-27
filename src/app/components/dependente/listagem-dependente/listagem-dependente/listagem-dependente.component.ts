import { Component } from '@angular/core';
import { Dependente } from '../../../../models/dependente.java/dependente';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DialogExcluirComponent } from '../../../dialog-excluir/dialog-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DependenteService } from '../../../../services/dependente/dependente.service';

@Component({
  selector: 'app-listagem-dependente',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listagem-dependente.component.html',
  styleUrl: './listagem-dependente.component.css'
})
export class ListagemDependenteComponent {
  dependentes: Dependente[] = [];
  displayedColumns: string[] = ['nome', 'dataNascimento', 'sexo', 'acoes']

  constructor(
    private dependenteService: DependenteService, 
    private dialog: MatDialog, 
    private toastrService: ToastrService
  ) { }

  excluirDependente(dependente: Dependente) {
    this.dependenteService.deletarDependente(dependente.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Título excluído com sucesso!')
        this.dependentes = this.dependentes.filter(c => c.id !== dependente.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar título', err);
      }           
    });
  }

  openDialog(dependente: Dependente): void{
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirDependente(dependente);        
      }
    });
  }
}
