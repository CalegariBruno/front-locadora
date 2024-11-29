export interface Locacao{

    id?: number;
    cliente: { id: number };
    item: { id: number };
    valorCobrado?: number;
    multaCobrada?: number;
    pago?: boolean;
    dtLocacao?: string;
    dtDevolucaoPrevista?: string;
    dtDevolucaoEfetiva?: string;

}