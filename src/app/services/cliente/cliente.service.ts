import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';
import { Socio } from '../../models/cliente/socio/socio';
import { Dependente } from '../../models/cliente/dependente/dependente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8080/api/clientes';

  constructor( private http: HttpClient ) {}

  // CRIAR SOCIO
  criarSocio(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(`${this.url}/criarSocio`, socio);
  }

  // CRIAR DEPENDENTE
  criarDependente(dependente: Dependente): Observable<Dependente> {
    return this.http.post<Dependente>(`${this.url}/criarDependente`, dependente);
  }

  // EDITAR SOCIO
  editarSocio(socio: Socio): Observable<Socio> {
    return this.http.put<Socio>(`${this.url}/editarSocio/${socio.id}`, socio);
  }

  // EDITAR DEPENDENTE
  editarDependente(dependente: Dependente): Observable<Dependente> {
    return this.http.put<Dependente>(`${this.url}/editarDependente/${dependente.id}`, dependente);
  }

  // MUDAR STATUS SOCIO
  mudarStatusSocio(id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/socio/status/${id}`, null);
  }

  // MUDAR STATUS DEPENDENTE
  mudarStatusDependente(id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/dependente/status/${id}`, null);
  }

  // DELETAR SOCIO
  deletarSocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletarSocio/${id}`);
  }

  // DELETAR DEPENDENTE
  deletarDependente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletarDependente/${id}`);
  }

  // LISTAR CLIENTES
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/listar`);
  }

  // LISTAR SOCIOS
  listarSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.url}/listarSocios`);
  }

  // LISTAR DEPENDENTES
  listarDependentes(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.url}/listarDependentes`);
  }

  // LISTAR SOCIOS DISPONIVEIS
  listarDisponiveis(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.url}/listarDisponiveis`);
  }

  // LISTAR CLIENTES ATIVOS
  listarAtivos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/listarAtivos`);
  }

  // BUSCAR CLIENTE
  buscarCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/buscar/${id}`);
  }

}
