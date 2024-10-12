import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Diretor } from '../../../models/diretor/diretor';
import { DiretorService } from '../../../services/diretor/diretor.service';

@Component({
  selector: 'app-diretor',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listagem-diretor.component.html',
  styleUrl: './listagem-diretor.component.css'
})

export class DiretorComponent implements OnInit{

  diretores: Diretor[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];  

  constructor(private diretorService: DiretorService) { }

  ngOnInit(): void {
    this.exibirDiretores();
  }

  exibirDiretores(): void {
    this.diretorService.listarDiretores().subscribe(
      (data: Diretor[]) => {
        this.diretores = data;
        console.log(this.diretores); // lembrar de tirar
      },
      (error) => {
        console.error('Erro ao carregar a lista de atores', error);
      }      
    );
  } 

  excluirDiretor(diretor: any) {
    // Implementar a lógica para excluir o Diretor da lista
    this.diretores = this.diretores.filter(c => c.id !== diretor.id);   
  }
}
