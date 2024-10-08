import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-diretor',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule
  ],
  templateUrl: './diretor.component.html',
  styleUrl: './diretor.component.css'
})
export class DiretorComponent {
  diretores = [
    { id: 1, nome: 'Diretor 1' },
    { id: 2, nome: 'Diretor 2' },
    { id: 3, nome: 'Diretor 3' }
  ];

  displayedColumns: string[] = ['nome', 'acoes'];

  editarDiretor(diretor: any) {
    // Configurar para abrir a tela de edição/cadastro
  }

  excluirDiretor(diretor: any) {
    // Implementar a lógica para excluir o Diretor da lista
    this.diretores = this.diretores.filter(c => c.id !== diretor.id);   
  }
}
