import { Base } from "src/base/entities/base.entity";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CreateItemDto } from "../dto/create-item.dto";
import { ItemListDto } from "../dto/item-list.dto";
import { ItemDto } from "../dto/item.dto";

@Entity()
export class Item extends Base{
    @Column({ type: 'varchar' })
    titulo: string;

    @Column({ type: 'real', nullable: true })
    precio?: number;

    @Column({ type: 'varchar', nullable: true })
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.item, { nullable: true })
    itemCategorias?: ItemCategoria[];

    static toListDto(e: Item): ItemListDto {
        return {
            id: e.id,
            titulo: e.titulo,
            precio: e.precio ?? undefined,
            descripcion: e.descripcion ?? undefined
        }
    }

    static toDto(e: CreateItemDto & Item | Item) {
        return {
            id: e.id,
            titulo: e.titulo,
            precio: e.precio ?? undefined,
            descripcion: e.descripcion ?? undefined,
            idsCategorias: e.itemCategorias && e.itemCategorias.length ?
                e.itemCategorias.map(i => i.categoria.id) : undefined
        } as ItemDto
    }
}
