import { Injectable } from '@angular/core';
import { Diretor } from '../../models/diretor/diretor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiretorService {

  private url = 'http://localhost:8080/api/diretores';

  constructor(private http: HttpClient) { }

  // LISTAR DIRETORES
  listarDiretores(): Observable<Diretor[]> {
    return this.http.get<Diretor[]>(`${this.url}/listar`);
  }

  // CRIAR DIRETOR
  criarDiretor(diretor: Diretor): Observable<Diretor> {
    return this.http.post<Diretor>(`${this.url}/criar`, diretor);
  }

  // EDITAR DIRETOR
  editarDiretor(diretor: Diretor): Observable<Diretor> {
    return this.http.put<Diretor>(`${this.url}/editar/${diretor.id}`, diretor);
  }

  // DELETAR DIRETOR
  deletarDiretor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR DIRETOR
  buscarDiretor(id: number): Observable<Diretor> {
    return this.http.get<Diretor>(`${this.url}/buscar/${id}`);
  }

}
