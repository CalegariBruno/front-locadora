import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ListagemDeAtoresComponent } from './components/listagem-de-atores/listagem-de-atores.component';
import { AtorComponent } from './components/ator/ator.component';
import { ClasseComponent } from './components/listagem-classe/listagem-classe.component';
import { DiretorComponent } from './components/listagem-diretor/listagem-diretor.component';
import { CadastroAtorComponent } from './components/cadastro-ator/cadastro-ator.component';
import { CadastroDiretorComponent } from './components/cadastro-diretor/cadastro-diretor.component';
import { CadastroClasseComponent } from './components/cadastro-classe/cadastro-classe.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'ator', pathMatch: 'full' }, // Rota padrão
  { path: 'ator', component: ListagemDeAtoresComponent },
  { path: 'cadastroAtor', component: CadastroAtorComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'diretor', component: DiretorComponent },
  { path: 'cadastroDiretor', component: CadastroDiretorComponent },
  { path: 'cadastroClasse', component: CadastroClasseComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    BrowserAnimationsModule, provideAnimations()]
};
