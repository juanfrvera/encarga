import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { CategoriaTypeOrmModel } from "src/categoria/storage/categoria.typeorm.model";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('comercio')
export class ComercioTypeOrmModel extends BaseTypeOrmModel {
    @Column({ unique: true })
    url: string;

    /** Categoría a donde van a parar los items sin categoria */
    @OneToOne(() => CategoriaTypeOrmModel, { eager: true }) @JoinColumn()
    categoriaDefecto: CategoriaTypeOrmModel;

    @OneToMany(() => CategoriaTypeOrmModel, categoria => categoria.comercio)
    categorias: CategoriaTypeOrmModel[];

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercio, usuarioComercio => usuarioComercio.comercio, { nullable: true })
    usuarioComercios: UsuarioComercio[];
}