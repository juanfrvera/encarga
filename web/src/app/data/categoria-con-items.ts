import { Categoria } from './categoria';
import { ItemConCantidad } from './item-con-cantidad';

export interface CategoriaConItemsConCantidad extends Categoria {
    items: ItemConCantidad[];
}
