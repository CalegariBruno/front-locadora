import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Socio, SocioList } from '../../../../models/socio/socio';
import { SocioService } from '../../../../services/socio/socio.service';
import { DialogExcluirComponent } from '../../../dialog-excluir/dialog-excluir.component';

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
export class ListagemSocioComponent implements OnInit{
  socios: SocioList[] = [];
  displayedColumns: string[] = ['nome', 'endereco','telefone', 'sexo', 'cpf', 'acoes'];

  constructor(
    private socioService: SocioService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
      this.exibirItens();
  }

  exibirItens(): void{
    this.socioService.listarSocios().subscribe(
      (data: SocioList[]) => {
        this.socios = data;
        console.log(this.socios); 
      },
      (error) => {        
        console.error('Erro ao carregar a lista de socios', error);
      }      
    );
  }

  excluirSocio(socio: Socio) {
    this.socioService.deletarSocio(socio.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Socio excluído com sucesso!')
      }         
    });
  }

  openDialog(socio: Socio): void{
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirSocio(socio);
        this.socios = this.socios.filter(c => c.id !== socio.id);
      }
    });
  }
}
