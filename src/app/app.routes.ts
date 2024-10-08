import { Routes } from '@angular/router';
import { AtorComponent } from './components/ator/ator.component';
import { ListagemDeAtoresComponent } from './components/listagem-de-atores/listagem-de-atores.component';
import { ClasseComponent } from './components/classe/classe.component';
import { DiretorComponent } from './components/diretor/diretor.component';

export const routes: Routes = [
    {
        path: '',
        component: AtorComponent
    }, 
    {
        path: 'ator/cadastroAtor',
        component: AtorComponent
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
    }
];
