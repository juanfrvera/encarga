import { LineaPedido } from './linea-pedido';

export class PedidoDto {
    lineas: LineaPedido[];
    urlComercio: string | null;
}
