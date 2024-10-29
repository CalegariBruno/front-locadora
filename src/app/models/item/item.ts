import { Titulo } from "../titulo/titulo";

export interface Item {
        
    id?: number
    numSerie: number;        
    dtAquisicao: string;       
    tipoItem: string; 
    titulo: {id: number};
}


export interface ItemList {
        
    id?: number
    numSerie: number;        
    dtAquisicao: string;       
    tipoItem: string; 
    titulo: Titulo;

}
