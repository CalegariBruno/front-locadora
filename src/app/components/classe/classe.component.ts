import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule
  ],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.css'
})
export class ClasseComponent {
  classes = [
    { id: 1, nome: 'classe 1' , valor: '15.7', dataDev: '18/12/2000'},
    { id: 2, nome: 'classe 2' , valor: '345', dataDev: '18/12/2000'},
    { id: 3, nome: 'classe 3' , valor: '19.4', dataDev: '18/12/2000'},
    { id: 4, nome: 'classe 4' , valor: '110.8', dataDev: '18/12/2000'}
  ];

  displayedColumns: string[] = ['nome', 'valor', 'dataDev', 'acoes'];

  editarClasse(classe: any) {
    // Configurar para abrir a tela de edição/cadastro
  }

  excluirClasse(classe: any) {
    // Implementar a lógica para excluir o classe da lista
    this.classes = this.classes.filter(c => c.id !== classe.id);   
  }
}
