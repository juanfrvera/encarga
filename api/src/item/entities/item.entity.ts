import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";

export class Item {
    titulo: string;
    precio?: number;
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    itemCategorias?: ItemCategoria[];
}
