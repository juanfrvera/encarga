import { BaseTypeOrmModel } from "src/typeorm/feature/base/base.typeorm.model";
import { CategoriaTypeOrmModel } from "src/typeorm/feature/categoria/categoria.typeorm.model";
import { ItemTypeOrmModel } from "src/typeorm/feature/item/item.typeorm.model";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('item_categoria')
export class ItemCategoriaTypeOrmModel extends BaseTypeOrmModel {
    @Column({ type: 'int' })
    order: number;

    @ManyToOne(() => ItemTypeOrmModel, item => item.itemCategoriaList, { eager: true })
    item: ItemTypeOrmModel;

    @ManyToOne(() => CategoriaTypeOrmModel, categoria => categoria.itemCategoriaList, { eager: true })
    categoria: CategoriaTypeOrmModel;
}