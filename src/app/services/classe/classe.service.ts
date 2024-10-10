import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../../models/classe/classe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private url = 'http://localhost:8080/api/classes';

  constructor(private http: HttpClient) { }

  // LISTAR CLASSES
  listarClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.url}/listar`);
  }

  // CRIAR CLASSE
  criarClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(`${this.url}/criar`, classe);
  }

  // EDITAR CLASSE
  editarClasse(classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.url}/editar/${classe.id}`, classe);
  }

  // DELETAR CLASSE
  deletarClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR CLASSE
  buscarClasse(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.url}/buscar/${id}`);
}

}
