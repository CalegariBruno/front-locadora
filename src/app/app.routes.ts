import { Routes } from '@angular/router';
import { AtorComponent } from './components/ator/ator.component';
import { ListagemDeAtoresComponent } from './components/listagem-de-atores/listagem-de-atores.component';

export const routes: Routes = [
    {
        path: '',
        component: AtorComponent
    }, {
        path: 'new',
        component: AtorComponent
    },
    {
        path: 'cadastroAtor/:id',
        component: AtorComponent
    },
    {
        path: 'ator',
        component: ListagemDeAtoresComponent
    }
];
