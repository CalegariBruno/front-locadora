import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Titulo } from '../../../models/titulo/titulo';
import { TituloService } from '../../../services/titulo/titulo.service';
import { ClasseService } from '../../../services/classe/classe.service';
import { DiretorService } from '../../../services/diretor/diretor.service';
import { ToastrService } from 'ngx-toastr';
import { Classe } from '../../../models/classe/classe';
import { Diretor } from '../../../models/diretor/diretor';
import { MatSelectModule } from '@angular/material/select';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';

@Component({
  selector: 'app-cadastro-titulo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './cadastro-titulo.component.html',
  styleUrls: ['./cadastro-titulo.component.css']
})
export class CadastroTituloComponent implements OnInit {

  titulo: Titulo = {
    nome: '',
    ano: 0,
    sinopse: '',
    categoria: '',
    classe: { id: 0 },
    diretor: { id: 0 },
    atores: []
  };
  id!: number;
  tipo!: string;
  classesList: Classe[] = [];
  diretoresList: Diretor[] = [];
  atoresList: Ator[] = [];

  constructor(
    private tituloService: TituloService,
    private classeService: ClasseService,
    private diretorService: DiretorService,
    private atorService: AtorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    // Carrega as classes
    this.classeService.listarClasses().subscribe((classes) => {
      this.classesList = classes;
    });

    // Carrega os diretores
    this.diretorService.listarDiretores().subscribe((diretores) => {
      this.diretoresList = diretores;
    });

    // Carrega os atores
    this.atorService.listarAtores().subscribe((atores) => {
      this.atoresList = atores;
    });

    // Pega o ID da URL para edição
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.tituloService.buscarTitulo(this.id).subscribe((titulo) => {
          this.titulo = titulo;
          console.log("FORM TITULO -> ", this.titulo);
        });
        this.tipo = 'Editar';
      } else {
        this.tipo = 'Cadastrar';
      }
    });

  }

  onSubmit(): void {

    console.log("ENTROU NO SUBMIT");
    console.log("FORM TITULO -> ", this.titulo);

    if (this.titulo.atores.length === 0) {
      this.toastrService.error('Selecione pelo menos um ator.');
      return;
    }

    if (this.titulo.nome && this.titulo.ano > 0 && this.titulo.categoria && this.titulo.classe.id > 0 && this.titulo.diretor.id > 0) {

      if (this.id) { // Editar título 
        this.tituloService.editarTitulo(this.titulo).subscribe({
          next: () => {
            this.router.navigate(['/titulo']);
            this.toastrService.success('Título editado com sucesso!');
            console.log('Título atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar o título', err);
          }
        });

      } else { // Criar título
        this.tituloService.criarTitulo(this.titulo).subscribe({
          next: () => {
            this.router.navigate(['/titulo']);
            this.toastrService.success('Título salvo com sucesso!');
            console.log('Título salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar o título', err);
          }
        });
      }
    }
  }
}
