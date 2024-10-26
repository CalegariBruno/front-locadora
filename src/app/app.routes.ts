import { Routes } from '@angular/router';
import { ListagemDeAtoresComponent } from './components/ator/listagem-de-atores/listagem-de-atores.component';
import { ClasseComponent } from './components/classe/listagem-classe/listagem-classe.component';
import { DiretorComponent } from './components/diretor/listagem-diretor/listagem-diretor.component';
import { CadastroAtorComponent } from './components/ator/cadastro-ator/cadastro-ator.component';
import { CadastroDiretorComponent } from './components/diretor/cadastro-diretor/cadastro-diretor.component';
import { CadastroClasseComponent } from './components/classe/cadastro-classe/cadastro-classe.component';
import { AppComponent } from './app.component';
import { ListagemTituloComponent } from './components/titulo/listagem-titulo/listagem-titulo.component';
import { CadastroTituloComponent } from './components/titulo/cadastro-titulo/cadastro-titulo.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    }, 
    {
        path: 'ator',
        component: ListagemDeAtoresComponent
    },
    {
        path: 'cadastroAtor',
        component: CadastroAtorComponent
    },
    {
        path: 'cadastroAtor/:id',
        component: CadastroAtorComponent
    },    
    {
        path: 'classe',
        component: ClasseComponent
    },
    {
        path: 'cadastroClasse',
        component: CadastroClasseComponent
    },
    {
        path: 'cadastroClasse/:id',
        component: CadastroClasseComponent
    },
    {
        path: 'diretor',
        component: DiretorComponent
    },
    {
        path: 'cadastroDiretor',
        component: CadastroDiretorComponent
    },
    {
        path: 'cadastroDiretor/:id',
        component: CadastroDiretorComponent
    },
    {
        path: 'titulo',
        component: ListagemTituloComponent
    },
    {
        path: 'cadastroTitulo',
        component: CadastroTituloComponent
    },
    {
        path: 'cadastroTitulo/:id',
        component: CadastroTituloComponent
    },
    
];
