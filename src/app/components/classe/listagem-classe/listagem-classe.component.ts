import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ClasseService } from '../../../services/classe/classe.service';
import { Classe } from '../../../models/classe/classe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listagem-classe.component.html',
  styleUrl: './listagem-classe.component.css'
})

export class ClasseComponent implements OnInit {

  classes: Classe[] = [];
  displayedColumns: string[] = ['nome', 'valor', 'prazoDevolucao', 'acoes'];  

  constructor(private classeService: ClasseService) { }

  ngOnInit(): void {
    this.exibirClasses();
  }

  exibirClasses(): void {
    this.classeService.listarClasses().subscribe(
      (data: Classe[]) => {
        this.classes = data;
        console.log(this.classes); // lembrar de tirar
      },
      (error) => {
        console.error('Erro ao carregar a lista de classes', error);
      }      
    );
  }

  excluirClasse(classe: any) {
    // Implementar a lógica para excluir o classe da lista
    //this.classes = this.classes.filter(c => c.id !== classe.id);   
  }
}
