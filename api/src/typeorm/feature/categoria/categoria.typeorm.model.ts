import { BaseTypeOrmModel } from "src/typeorm/feature/base/base.typeorm.model";
import { ItemCategoriaTypeOrmModel } from "src/typeorm/feature/item-categoria/item-categoria.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";
import { ComercioCategoriaTypeOrmModel } from "../comercio-categoria/comercio-categoria.typeorm.model";

@Entity('categoria')
export class CategoriaTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'varchar' })
    nombre: string;

    @OneToMany(() => ComercioCategoriaTypeOrmModel, comercioCategoria => comercioCategoria.categoria)
    comercioCategoriaList: Array<ComercioCategoriaTypeOrmModel>;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoriaTypeOrmModel, itemCategoria => itemCategoria.categoria)
    itemCategoriaList: Array<ItemCategoriaTypeOrmModel>;
}