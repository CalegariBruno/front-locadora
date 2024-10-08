import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ListagemDeAtoresComponent } from './components/listagem-de-atores/listagem-de-atores.component';
import { AtorComponent } from './components/ator/ator.component';
import { ClasseComponent } from './components/classe/classe.component';
import { DiretorComponent } from './components/diretor/diretor.component';

const routes: Routes = [
  { path: '', redirectTo: 'ator', pathMatch: 'full' }, // Rota padrão
  { path: 'ator', component: ListagemDeAtoresComponent }, // Rota do ator
  { path: 'ator/cadastroAtor', component: AtorComponent }, // Rota do ator
  { path: 'classe', component: ClasseComponent },
  { path: 'diretor', component: DiretorComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes), 
      provideAnimationsAsync('noop'),
    BrowserAnimationsModule,  provideAnimations()]
};
