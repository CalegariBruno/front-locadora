import { Cliente } from "../cliente/cliente";
import { Item } from "../item/item";


export interface Locacao {
    id?: number;
    item: {id: number}
    cliente: {id: number};
    valor: number;
    dtPrevista: string;
    pago: boolean;
}

export interface LocacaoList {
    id?: number;
    item: Item;
    cliente: Cliente;
    valor: number;
    dtPrevista: string;
    pago: boolean;
}