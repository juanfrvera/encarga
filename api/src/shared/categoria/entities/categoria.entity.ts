import { ItemCategoria } from "src/shared/item-categoria/entities/item-categoria.entity";

export class Categoria {
    id: string;
    name: string;
    itemList?: ItemCategoria[];

    constructor(id: string, nombre: string, itemList?: ItemCategoria[]){
        this.id = id;
        this.name = nombre;
        this.itemList = itemList;
    }
}
