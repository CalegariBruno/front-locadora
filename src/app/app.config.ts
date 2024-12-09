import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ListagemDeAtoresComponent } from './components/ator/listagem-de-atores/listagem-de-atores.component';
import { ClasseComponent } from './components/classe/listagem-classe/listagem-classe.component';
import { DiretorComponent } from './components/diretor/listagem-diretor/listagem-diretor.component';
import { CadastroAtorComponent } from './components/ator/cadastro-ator/cadastro-ator.component';
import { CadastroDiretorComponent } from './components/diretor/cadastro-diretor/cadastro-diretor.component';
import { CadastroClasseComponent } from './components/classe/cadastro-classe/cadastro-classe.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ListagemTituloComponent } from './components/titulo/listagem-titulo/listagem-titulo.component';
import { CadastroTituloComponent } from './components/titulo/cadastro-titulo/cadastro-titulo.component';
import { ListagemItemComponent } from './components/item/listagem-item/listagem-item.component';
import { CadastroItemComponent } from './components/item/cadastro-item/cadastro-item.component';
import { RegistrarLocacaoComponent } from './components/locacao/registrar-locacao/registrar-locacao.component';
import { ListarLocacoesComponent } from './components/devolucao/listar-locacoes/listar-locacoes.component';
import { RegistrarDevolucaoComponent } from './components/devolucao/registrar-devolucao/registrar-devolucao.component';
import { ListagemSocioComponent } from './components/socio/listagem-socio/listagem-socio.component';
import { CadastroSocioComponent } from './components/socio/cadastro-socio/cadastro-socio.component';
import { ListagemDependentesComponent } from './components/dependente/listagem-dependentes/listagem-dependentes.component';
import { CadastroDependenteComponent } from './components/dependente/criar-dependente/criar-dependente.component';
import { PaginaPesquisaComponent } from './components/pagina-pesquisa/pagina-pesquisa/pagina-pesquisa.component';
 
const routes: Routes = [
  { path: '', component: PaginaPesquisaComponent}, // Rota padrão
  { path: 'ator', component: ListagemDeAtoresComponent },
  { path: 'cadastroAtor', component: CadastroAtorComponent },
  { path: 'cadastroAtor/:id', component: CadastroAtorComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'cadastroClasse', component: CadastroClasseComponent },
  { path: 'cadastroClasse/:id', component: CadastroClasseComponent },
  { path: 'diretor', component: DiretorComponent },
  { path: 'cadastroDiretor', component: CadastroDiretorComponent },
  { path: 'cadastroDiretor/:id', component: CadastroDiretorComponent },
  { path: 'titulo', component: ListagemTituloComponent },
  { path: 'cadastroTitulo', component: CadastroTituloComponent },
  { path: 'cadastroTitulo/:id', component: CadastroTituloComponent },
  { path: 'item', component: ListagemItemComponent },
  { path: 'cadastroItem', component: CadastroItemComponent },
  { path: 'cadastroItem/:id', component: CadastroItemComponent },
  { path: 'locacao', component: RegistrarLocacaoComponent },
  { path: 'locacao/:id', component: RegistrarLocacaoComponent },
  { path: 'devolucao', component: ListarLocacoesComponent },
  { path: 'registrarDevolucao/:id', component: RegistrarDevolucaoComponent },
  { path: 'socio', component: ListagemSocioComponent },
  { path: 'cadastroSocio', component: CadastroSocioComponent },
  { path: 'cadastroSocio/:id', component: CadastroSocioComponent },
  { path: 'dependente', component: ListagemDependentesComponent },
  { path: 'cadastroDependente', component: CadastroDependenteComponent },
  { path: 'cadastroDependente/:id', component: CadastroDependenteComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideToastr(),
    BrowserAnimationsModule, provideAnimations()]
};
