import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";

export class Item {
    id: string;
    titulo: string;
    precio?: number;
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    itemCategoriaList?: ItemCategoria[];

    constructor(
        id: string, titulo: string, precio?: number, descripcion?: string, itemCategoriaList? : ItemCategoria[]){
            this.id = id;
            this.titulo = titulo;
            this.precio = precio;
            this.descripcion = descripcion;
            this.itemCategoriaList = itemCategoriaList;
    }
}
