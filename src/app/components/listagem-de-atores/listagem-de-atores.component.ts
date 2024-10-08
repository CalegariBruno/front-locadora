import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-de-atores',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    RouterLink],
  templateUrl: './listagem-de-atores.component.html',
  styleUrl: './listagem-de-atores.component.css'
})
export class ListagemDeAtoresComponent {
  // Lista de atores com dados de exemplo
  atores = [
    { id: 1, nome: 'Ator 1' },
    { id: 2, nome: 'Ator 2' },
    { id: 3, nome: 'Ator 3' }
  ];

  @Input() tipo: string = 'Atores';

  displayedColumns: string[] = ['nome', 'acoes'];

  editarAtor(ator: any) {
    // Configurar para abrir a tela de edição/cadastro
  }

  excluirAtor(ator: any) {
    // Implementar a lógica para excluir o ator da lista 
    this.atores = this.atores.filter(c => c.id !== ator.id);   
  
  }
}