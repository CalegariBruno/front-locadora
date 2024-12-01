import { Component, OnInit } from '@angular/core';
import { Dependente } from '../../../../models/cliente/dependente';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DialogExcluirComponent } from '../../../dialog-excluir/dialog-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../../services/cliente/cliente.service';

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
export class ListagemDependenteComponent implements OnInit{
  dependentes: Dependente[] = [];
  displayedColumns: string[] = ['nome', 'dataNascimento', 'sexo', 'socio', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog, 
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.exibirDependentes();
  }

  exibirDependentes(): void{
    this.clienteService.listarDependentes().subscribe(
      (data: Dependente[]) => {
        this.dependentes = data;
        console.log(this.dependentes); 
      },
      (error) => {        
        console.error('Erro ao carregar a lista de dependentes', error);
      }      
    );
  }

  excluirDependente(dependente: Dependente) {
    this.clienteService.deletarDependente(dependente.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Dependente excluído com sucesso!')
        this.dependentes = this.dependentes.filter(c => c.id !== dependente.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar dependente', err);
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
