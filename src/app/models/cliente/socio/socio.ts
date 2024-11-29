import { Cliente } from "../cliente";

export interface Socio extends Cliente {

    endereco: string;
    cpf: string;
    telefone: string;

}
