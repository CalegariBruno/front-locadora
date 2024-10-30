import { Ator } from "../ator/ator";
import { Classe } from "../classe/classe";
import { Diretor } from "../diretor/diretor";

export interface Titulo {

    id?: number;
    nome: string;
    ano: number;
    sinopse: string;
    categoria: string;
    atores: { id: number }[];
    diretor: { id: number };
    classe: { id: number };    

}
