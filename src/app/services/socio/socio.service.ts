import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Socio } from "../../models/socio/socio";

@Injectable({
    providedIn: 'root'
})

export class SocioService {

    private url = 'http://localhost:8080/api/socios';

    constructor(private http: HttpClient) { }

    // LISTAR SOCIOS
    listarSocios(): Observable<Socio[]> {
        return this.http.get<Socio[]>(`${this.url}/listar`);
    }

    // CRIAR SOCIO
    criarSocio(socio: Socio): Observable<Socio> {
        return this.http.post<Socio>(`${this.url}/criar`, socio);
    }

    // EDITAR SOCIO
    editarSocio(socio: Socio): Observable<Socio> {
        return this.http.put<Socio>(`${this.url}/editar/${socio.id}`, socio);
    }

    // DELETAR SOCIO
    deletarSocio(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/deletar/${id}`);
    }

    // BUSCAR SOCIO
    buscarSocio(id: number): Observable<Socio> {
        return this.http.get<Socio>(`${this.url}/buscar/${id}`);
    }

}