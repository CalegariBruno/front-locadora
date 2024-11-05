import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TituloService } from '../../../services/titulo/titulo.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Titulo } from '../../../models/titulo/titulo';
import { DialogExcluirComponent } from '../../dialog-excluir/dialog-excluir.component';

@Component({
  selector: 'app-listagem-titulo',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listagem-titulo.component.html',
  styleUrl: './listagem-titulo.component.css'
})
export class ListagemTituloComponent implements OnInit{

  titulos: Titulo[] = [];
  displayedColumns: string[] = ['nome', 'ano', 'categoria',  'diretor', 'classe', 'acoes'];

  constructor(
    private tituloService: TituloService, 
    private dialog: MatDialog, 
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.exibirTitulos();
  }

  exibirTitulos(): void {
    this.tituloService.listarTitulos().subscribe(
      (data: Titulo[]) => {
        this.titulos = data;
        console.log(this.titulos); 
      },
      (error) => {        
        console.error('Erro ao carregar a lista de titulos', error);
      }      
    );
  }  

  excluirTitulo(titulo: Titulo) {
    this.tituloService.deletarTitulo(titulo.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Título excluído com sucesso!')
        this.titulos = this.titulos.filter(c => c.id !== titulo.id);
      },
      error: (err) => {
        this.toastrService.error(err.error.msg);
        console.error('Erro ao deletar título', err);
      }           
    });
  }

  openDialog(titulo: Titulo): void{
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirTitulo(titulo);        
      }
    });
  }
}
