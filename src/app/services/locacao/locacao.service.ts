import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocacaoList, Locacao } from "../../models/locacao/locacao";

@Injectable({
    providedIn: 'root'
  })
export class LocacaoService { 
    private url = 'http://localhost:8080/api/locacoes';

  constructor(private http: HttpClient) { }

  // LISTAR LOCACAO
  listarLocacoes(): Observable<LocacaoList[]> {
    return this.http.get<LocacaoList[]>(`${this.url}/listar`);
  }

  // CRIAR LOCACAO
  criarLocacao(locacao: Locacao): Observable<Locacao> {
    return this.http.post<Locacao>(`${this.url}/criar`, locacao);
  }

  // EDITAR LOCACAO
  editarLocacao(locacao: Locacao): Observable<Locacao> {
    return this.http.put<Locacao>(`${this.url}/editar/${locacao.id}`, locacao);
  }

  // DELETAR LOCACAO
  deletarLocacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR LOCACAO
  buscarLocacao(id: number): Observable<Locacao> {
    return this.http.get<Locacao>(`${this.url}/buscar/${id}`);
  }
}