import { LineaPedido } from "./linea-pedido";
import { PedidoDto } from "./pedido.dto";

export class Pedido {
    lines: LineaPedido[];
    urlComercio: string | null;

    public get HasItems() {
        return !!this.lines && !!this.lines.length;
    }

    constructor(lineas: LineaPedido[], urlComercio: string | null) {
        this.lines = lineas;
        this.urlComercio = urlComercio;
    }

    public static fromDto(dto: PedidoDto) {
        return new Pedido(dto.lineas, dto.urlComercio);
    }
    public static toDto(entity: Pedido): PedidoDto {
        return {
            lineas: entity.lines,
            urlComercio: entity.urlComercio
        }
    }
}