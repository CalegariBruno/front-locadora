import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemList } from '../../models/item/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = 'http://localhost:8080/api/itens';

  constructor(private http: HttpClient) { }

  // LISTAR ITENS
  listarItens(): Observable<ItemList[]> {
    return this.http.get<ItemList[]>(`${this.url}/listar`);
  }

  // CRIAR ITEM
  criarItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.url}/criar`, item);
  }

  // EDITAR ITEM
  editarItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.url}/editar/${item.id}`, item);
  }

  // DELETAR ITEM
  deletarItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletar/${id}`);
  }

  // BUSCAR ITEM
  buscarItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.url}/buscar/${id}`);
  }

}
