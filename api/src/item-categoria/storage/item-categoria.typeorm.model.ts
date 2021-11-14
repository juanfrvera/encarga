import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { CategoriaTypeOrmModel } from "src/categoria/storage/categoria.typeorm.model";
import { ItemTypeOrmModel } from "src/item/storage/item.typeorm.model";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('item_categoria')
export class ItemCategoriaTypeOrmModel extends BaseTypeOrmModel{
    @Column({ type: 'int' })
    orden: number;

    @ManyToOne(() => ItemTypeOrmModel, item => item.itemCategorias, { primary: true, eager: true })
    item: ItemTypeOrmModel;

    @ManyToOne(() => CategoriaTypeOrmModel, categoria => categoria.itemCategoriaList, { primary: true, eager: true })
    categoria: CategoriaTypeOrmModel;
}