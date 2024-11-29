import { Cliente } from "../cliente";
import { Socio } from "../socio/socio";

export interface Dependente extends Cliente {
    socio: { id: number };
}
