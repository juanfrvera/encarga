import { ItemCategoria } from "src/data/entities/item-categoria.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    titulo: string;

    @Column({ type: 'real' })
    precio?: number;

    @Column({ type: 'varchar' })
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.item)
    itemCategorias: ItemCategoria[];
}
