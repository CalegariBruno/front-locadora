import { Cliente } from "./cliente";

export interface Dependente extends Cliente{
    socio: { id: number }
}