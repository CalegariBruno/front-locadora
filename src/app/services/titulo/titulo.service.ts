import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Titulo } from '../../models/titulo/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private url = 'http://localhost:8080/api/titulos';

  constructor(private http: HttpClient) { }

  // LISTAR TITULOS
  listarTitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.url}/listar`);
  }

  // CRIAR TITULO
  criarTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.post<Titulo>(`${this.url}/criar`, titulo);
  }

  // EDITAR TITULO
  editarTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.put<Titulo>(`${this.url}/editar/${titulo.id}`, titulo);
  }

  // DELETAR TITULO
  deletarTitulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR TITULO
  buscarTitulo(id: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.url}/buscar/${id}`);
  }

  // BUSCAR TITULO POR NOME
  buscarTituloPorNome(nome: string): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.url}/buscar/nome/${nome}`);
  }

  // BUSCAR TITULO POR CATEGORIA
  buscarTituloPorCategoria(categoria: string): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.url}/buscar/categoria/${categoria}`);
  }

  // BUSCAR TITULO POR ATORES
  buscarTituloPorAtor(ator: string): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.url}/buscar/ator/${ator}`);
  }

}
