import { ICategoria } from './categoria.dto';
import { ItemConCantidad } from '../item/item-con-cantidad';

export interface CategoriaConItemsConCantidad extends ICategoria {
    items: ItemConCantidad[];
}
