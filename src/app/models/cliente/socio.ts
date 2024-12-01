import { Cliente } from "../cliente/cliente";

export interface Socio extends Cliente{
    endereco: string;
    cpf: string;
    telefone: string;
}

