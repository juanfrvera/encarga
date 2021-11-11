import { Categoria } from "src/categoria/entities/categoria.entity";
import { Item } from "src/item/entities/item.entity";

/** Relaciona un item con una categoría, manteniendo el orden del item en esa categoría */
export class ItemCategoria {
    orden: number;
    item: Item;
    categoria: Categoria;

    constructor(item: Item, categoria: Categoria, orden: number) {
        this.item = item;
        this.categoria = categoria;
        this.orden = orden;
    }
}