import { BaseTypeOrmModel } from "src/typeorm/feature/base/base.typeorm.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { CategoriaTypeOrmModel } from "../categoria/categoria.typeorm.model";
import { ComercioTypeOrmModel } from "../feature/comercio/comercio.typeorm.model";

@Entity('comercio_categoria')
export class ComercioCategoriaTypeOrmModel extends BaseTypeOrmModel {
    @ManyToOne(() => ComercioTypeOrmModel, comercio => comercio.comercioCategoriaList, { primary: true, eager: true })
    comercio: ComercioTypeOrmModel;

    @ManyToOne(() => CategoriaTypeOrmModel, categoria => categoria.itemCategoriaList, { primary: true, eager: true })
    categoria: CategoriaTypeOrmModel;

    @Column()
    isDefault: boolean;
}