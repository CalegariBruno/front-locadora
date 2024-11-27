import { Injectable } from '@angular/core';
import { Dependente } from '../../models/dependente.java/dependente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenteService {

  private url = 'http://localhost:8080/api/Dependentees';

  constructor(private http: HttpClient) { }

  // LISTAR DependenteES
  listarDependentees(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.url}/listar`);
  }

  // CRIAR Dependente
  criarDependente(dependente: Dependente): Observable<Dependente> {
    return this.http.post<Dependente>(`${this.url}/criar`, dependente);
  }

  // EDITAR Dependente
  editarDependente(dependente: Dependente): Observable<Dependente> {
    return this.http.put<Dependente>(`${this.url}/editar/${dependente.id}`, dependente);
  }

  // DELETAR Dependente
  deletarDependente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR Dependente
  buscarDependente(id: number): Observable<Dependente> {
    return this.http.get<Dependente>(`${this.url}/buscar/${id}`);
  }

}
