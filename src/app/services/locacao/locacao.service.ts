import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locacao } from '../../models/locacao/locacao';
import { Devolucao } from '../../models/devolucao/devolucao';


@Injectable({
    providedIn: 'root'
})
export class LocacaoService {

    private url = 'http://localhost:8080/api/locacoes';

    constructor(private http: HttpClient) { }

    // LISTAR LOCACOES
    listarLocacoes(): Observable<Locacao[]> {
        return this.http.get<Locacao[]>(`${this.url}/listar`);
    }

    // CRIAR LOCACAO
    criarLocacao(locacao: Locacao): Observable<Locacao> {
        return this.http.post<Locacao>(`${this.url}/efetuarLocacao`, locacao);
    }

    //CRIAR DEVOLUCAO
    criarDevolucao(devolucao: Devolucao, id: number): Observable<Locacao> {
        return this.http.post<Locacao>(`${this.url}/efetuarDevolucao/${id}`, devolucao);
    }

    // EDITAR LOCACAO
    editarLocacao(locacao: Locacao, id: number): Observable<Locacao> {
        return this.http.put<Locacao>(`${this.url}/editar/${id}`, locacao);
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