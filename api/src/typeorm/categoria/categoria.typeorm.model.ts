import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { ComercioTypeOrmModel } from "src/typeorm/comercio/comercio.typeorm.model";
import { ItemCategoriaTypeOrmModel } from "src/typeorm/item-categoria/item-categoria.typeorm.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('categoria')
export class CategoriaTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'varchar' })
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoriaTypeOrmModel, itemCategoria => itemCategoria.categoria)
    itemCategoriaList: ItemCategoriaTypeOrmModel[];

    @ManyToOne(() => ComercioTypeOrmModel, comercio => comercio.categoriaListWithoutDefault)
    comercio: ComercioTypeOrmModel;
}