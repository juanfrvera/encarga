import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";

export class Categoria {
    id: string;
    nombre: string;
    itemList?: ItemCategoria[];

    constructor(id: string, nombre: string, itemList?: ItemCategoria[]){
        this.id = id;
        this.nombre = nombre;
        this.itemList = itemList;
    }
}
