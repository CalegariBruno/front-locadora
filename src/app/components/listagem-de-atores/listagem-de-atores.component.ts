import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AtorService } from '../../services/ator/ator.service';
import { Ator } from '../../models/ator/ator';

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

export class ListagemDeAtoresComponent implements OnInit {

  atores: Ator[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];
  @Input() tipo: string = 'Atores';

  constructor(private atorService: AtorService) { }

  ngOnInit(): void {
    this.exibirAtores();
  }

  exibirAtores(): void {
    this.atorService.listarAtores().subscribe(
      (data: Ator[]) => {
        this.atores = data;
        console.log(this.atores); // lembrar de tirar
      },
      (error) => {
        console.error('Erro ao carregar a lista de atores', error);
      }      
    );
  }

  editarAtor(ator: any) {
    // Configurar para abrir a tela de edição/cadastro
  }

  excluirAtor(ator: any) {
    // Implementar a lógica para excluir o ator da lista 
    //this.atores = this.atores.filter(c => c.id !== ator.id);
  }
}