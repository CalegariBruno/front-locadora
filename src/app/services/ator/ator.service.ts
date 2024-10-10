import { Injectable } from "@angular/core";
import { Ator } from "../../models/ator/ator";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AtorService {

    private url = 'http://localhost:8080/api/atores';

    constructor(private http: HttpClient) { }

    // LISTAR ATORES
    listarAtores(): Observable<Ator[]> {
        return this.http.get<Ator[]>(`${this.url}/listar`);
    }

    // CRIAR ATOR
    criarAtor(ator: Ator): Observable<Ator> {
        return this.http.post<Ator>(`${this.url}/criar`, ator);
    }

    // EDITAR ATOR
    editarAtor(ator: Ator): Observable<Ator> {
        return this.http.put<Ator>(`${this.url}/editar/${ator.id}`, ator);
    }

    // DELETAR ATOR
    deletarAtor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/deletar/${id}`);
    }

    // BUSCAR ATOR
    buscarAtor(id: number): Observable<Ator> {
        return this.http.get<Ator>(`${this.url}/buscar/${id}`);
    }

}