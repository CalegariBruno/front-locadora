import { Routes } from '@angular/router';
import { AtorComponent } from './components/ator/ator.component';
import { ListagemDeAtoresComponent } from './components/listagem-de-atores/listagem-de-atores.component';
import { ClasseComponent } from './components/listagem-classe/listagem-classe.component';
import { DiretorComponent } from './components/listagem-diretor/listagem-diretor.component';
import { CadastroAtorComponent } from './components/cadastro-ator/cadastro-ator.component';
import { CadastroDiretorComponent } from './components/cadastro-diretor/cadastro-diretor.component';
import { CadastroClasseComponent } from './components/cadastro-classe/cadastro-classe.component';

export const routes: Routes = [
    {
        path: '',
        component: AtorComponent
    }, 
    {
        path: 'cadastroAtor',
        component: CadastroAtorComponent
    },
    {
        path: 'ator',
        component: ListagemDeAtoresComponent
    },
    {
        path: 'classe',
        component: ClasseComponent
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
        path: 'cadastroClasse',
        component: CadastroClasseComponent
    }
];
