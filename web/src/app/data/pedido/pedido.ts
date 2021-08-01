import { LineaPedido } from "./linea-pedido";
import { PedidoDto } from "./pedido.dto";

export class Pedido {
    lineas: LineaPedido[];

    public get HayItems() {
        return !!this.lineas && !!this.lineas.length;
    }

    constructor(lineas: LineaPedido[]) {
        this.lineas = lineas;
    }

    public static fromDto(dto: PedidoDto) {
        return new Pedido(dto.lineas);
    }
    public static toDto(entity: Pedido): PedidoDto {
        return {
            lineas: entity.lineas
        }
    }
}