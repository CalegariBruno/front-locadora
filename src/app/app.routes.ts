import { Routes } from '@angular/router';
import { AtorComponent } from './components/ator/ator.component';

export const routes: Routes = [
    {
        path: '',
        component: AtorComponent
    }, {
        path: 'new',
        component: AtorComponent
    },
    {
        path: 'new/:id',
        component: AtorComponent
    }
];
