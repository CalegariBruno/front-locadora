import { Endereco } from "../Endereco/endereco";

export interface Socio {

    id?: number;
    nome: string;
    endereco: Endereco;
    telefone: string;
    sexo: 'M' | 'F';
    cpf: string;
    dataNasc: string;

}

export interface SocioList {

    id?: number;
    nome: string;
    endereco: Endereco;
    telefone: string;
    sexo: string;
    cpf: string;
    dataNasc: string;

}

