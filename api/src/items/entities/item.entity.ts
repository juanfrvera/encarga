import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemListDto } from "../dto/item-list.dto";
import { ItemDto } from "../dto/item.dto";

@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    titulo: string;

    @Column({ type: 'real', nullable: true })
    precio?: number;

    @Column({ type: 'varchar', nullable: true })
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.item)
    itemCategorias: ItemCategoria[];

    toDto(): ItemDto {
        return {
            id: this.id,
            titulo: this.titulo,
            precio: this.precio,
            descripcion: this.descripcion,
            idsCategorias: this.itemCategorias?.map(i => i.categoria.id)
        }
    }

    toListDto(): ItemListDto {
        return {
            id: this.id,
            titulo: this.titulo,
            precio: this.precio,
            descripcion: this.descripcion
        }
    }
}
