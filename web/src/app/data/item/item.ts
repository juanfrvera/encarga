import { ItemList } from "./item-list";
import { IItem } from "./item.dto";

export class Item implements IItem {
    id: string;
    titulo: string;
    precio?: number;
    descripcion?: string;
    idsCategorias?: string[];

    static fromDto(dto: IItem) {
        return {
            id: dto.id,
            titulo: dto.titulo,
            precio: dto.precio,
            descripcion: dto.descripcion,
            idsCategorias: dto.idsCategorias
        } as Item;
    }
    static fromListDto(dto: ItemList) {
        return { id: dto.id, titulo: dto.titulo, precio: dto.precio, descripcion: dto.descripcion } as Item;
    }
    static toDto(i: Item) {
        return {
            id: i.id,
            titulo: i.titulo,
            precio: i.precio,
            descripcion: i.descripcion,
            idsCategorias: i.idsCategorias
        } as IItem;
    }

}