import { Comercio } from "src/comercio/entities/comercio.entity";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";

export class Categoria {
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    itemCategorias: ItemCategoria[];
    comercio: Comercio;
}
