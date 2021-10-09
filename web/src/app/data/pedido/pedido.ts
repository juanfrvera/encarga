import { LineaPedido } from "./linea-pedido";
import { PedidoDto } from "./pedido.dto";

export class Pedido {
    lineas: LineaPedido[];
    urlComercio: string | null;

    public get HayItems() {
        return !!this.lineas && !!this.lineas.length;
    }

    constructor(lineas: LineaPedido[], urlComercio: string | null) {
        this.lineas = lineas;
        this.urlComercio = urlComercio;
    }

    public static fromDto(dto: PedidoDto) {
        return new Pedido(dto.lineas, dto.urlComercio);
    }
    public static toDto(entity: Pedido): PedidoDto {
        return {
            lineas: entity.lineas,
            urlComercio: entity.urlComercio
        }
    }
}