import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { ItemCategoriaTypeOrmModel } from "src/item-categoria/storage/item-categoria.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('item')
export class ItemTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'varchar' })
    titulo: string;

    @Column({ type: 'real', nullable: true })
    precio?: number;

    @Column({ type: 'varchar', nullable: true })
    descripcion?: string;

    /** Categorías en las que está este item, junto con el orden de este en dicha categoría */
    @OneToMany(() => ItemCategoriaTypeOrmModel, itemCategoria => itemCategoria.item, { nullable: true })
    itemCategorias?: ItemCategoriaTypeOrmModel[];
}