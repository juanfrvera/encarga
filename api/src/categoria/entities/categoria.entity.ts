import { Comercio } from "src/comercio/entities/comercio.entity";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";

export class Categoria {
    id: string;
    comercioId: string;
    nombre: string;

    constructor(id: string, comercioId: string, nombre: string){
        this.id = id;
        this.comercioId = comercioId;
        this.nombre = nombre;
    }
}
