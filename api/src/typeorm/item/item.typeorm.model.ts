import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { ItemCategoriaTypeOrmModel } from "src/typeorm/item-categoria/item-categoria.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('item')
export class ItemTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'real', nullable: true })
    price?: number;

    @Column({ type: 'varchar', nullable: true })
    description?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    @OneToMany(() => ItemCategoriaTypeOrmModel, itemCategoria => itemCategoria.item, { nullable: true })
    itemCategoriaList?: ItemCategoriaTypeOrmModel[];
}