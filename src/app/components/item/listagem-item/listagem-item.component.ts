import { Component, OnInit } from '@angular/core';
import { Item, ItemList } from '../../../models/item/item';
import { ItemService } from '../../../services/item/item.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DialogExcluirComponent } from '../../dialog-excluir/dialog-excluir.component';

@Component({
  selector: 'app-listagem-item',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listagem-item.component.html',
  styleUrl: './listagem-item.component.css'
})
export class ListagemItemComponent implements OnInit{

  itens: ItemList[] = [];
  displayedColumns: string[] = ['numSerie', 'dtAquisicao', 'titulo', 'tipoItem', 'acoes'];

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
      this.exibirItens();
  }

  exibirItens(): void{
    this.itemService.listarItens().subscribe(
      (data: ItemList[]) => {
        this.itens = data;
        console.log(this.itens); 
      },
      (error) => {        
        console.error('Erro ao carregar a lista de itens', error);
      }      
    );
  }

  excluirItem(item: Item) {
    this.itemService.deletarItem(item.id!).subscribe({
      next: ()=> {
        this.toastrService.success('Ator excluído com sucesso!')
      }         
    });
  }

  openDialog(item: Item): void{
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirItem(item);
        this.itens = this.itens.filter(c => c.id !== item.id);
      }
    });
  }


}
