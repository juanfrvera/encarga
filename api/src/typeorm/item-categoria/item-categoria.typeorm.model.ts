import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { CategoriaTypeOrmModel } from "src/typeorm/categoria/categoria.typeorm.model";
import { ItemTypeOrmModel } from "src/typeorm/item/item.typeorm.model";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('item_categoria')
export class ItemCategoriaTypeOrmModel extends BaseTypeOrmModel{
    @Column({ type: 'int' })
    orden: number;

    @ManyToOne(() => ItemTypeOrmModel, item => item.itemCategoriaList, { primary: true, eager: true })
    item: ItemTypeOrmModel;

    @ManyToOne(() => CategoriaTypeOrmModel, categoria => categoria.itemCategoriaList, { primary: true, eager: true })
    categoria: CategoriaTypeOrmModel;
}