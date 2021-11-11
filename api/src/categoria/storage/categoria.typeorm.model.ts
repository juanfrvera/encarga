import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { ComercioTypeOrmModel } from "src/comercio/storage/comercio.typeorm.model";
import { ItemCategoriaTypeOrmModel } from "src/item-categoria/storage/item-categoria.typeorm.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('categoria')
export class CategoriaTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'varchar' })
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoriaTypeOrmModel, itemCategoria => itemCategoria.categoria)
    itemCategorias: ItemCategoriaTypeOrmModel[];

    @ManyToOne(() => ComercioTypeOrmModel, comercio => comercio.categorias)
    comercio: ComercioTypeOrmModel;
}