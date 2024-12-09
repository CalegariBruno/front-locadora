import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Titulo } from '../../../models/titulo/titulo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TituloService } from '../../../services/titulo/titulo.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-pesquisa',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule, 
    MatIconModule,
    CommonModule,
    MatSelectModule 
  ],
  templateUrl: './pagina-pesquisa.component.html',
  styleUrl: './pagina-pesquisa.component.css'
})
export class PaginaPesquisaComponent {
  pesquisa: string = '';

  displayedColumns: string[] = ['nome', 'ano', 'categoria', 'atores', 'diretor', 'classe'];
  
  titulos: Titulo[] = [];

  tiposPesquisa: string[] = ['Titulo', 'Ator', 'Categoria' ] 
  tipoSelecionado: string = '';

  constructor(
    private tituloService: TituloService,
    private toastrService: ToastrService
  ) { }

  onSubmit(): void {
    // Mapeamento de funções
    const buscaPorTipo: { [key: string]: () => Observable<Titulo[]> } = {
      'Titulo': () => this.tituloService.buscarTituloPorNome(this.pesquisa),
      'Ator': () => this.tituloService.buscarTituloPorAtor(this.pesquisa),
      'Classe': () => this.tituloService.buscarTituloPorCategoria(this.pesquisa),
    };
  
    // Verifica se o tipo selecionado é válido
    const buscar = buscaPorTipo[this.tipoSelecionado];
  
    if (buscar) {
      buscar().subscribe(
        (data: Titulo[]) => {
          this.titulos = data;
          console.log(this.titulos);
          if(data.length == 0){
            this.toastrService.warning("Não foi encontrado nenhum título pelo " + this.tipoSelecionado + ' ' + this.pesquisa)
          }
        },
        (error) => {
          console.error(`Erro na busca do título: ${this.pesquisa}`, error);
        }
      );
    } else {
      this.toastrService.warning("Pesquisa não suportada")
      console.warn(`Insira sua pesquisa: ${this.tipoSelecionado}`);
    }
  }
}
