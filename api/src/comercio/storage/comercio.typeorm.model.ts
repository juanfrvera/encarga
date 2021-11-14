import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { CategoriaTypeOrmModel } from "src/categoria/storage/categoria.typeorm.model";
import { UsuarioComercioTypeOrmModel } from "src/usuario-comercio/storage/usuario-comercio.typeorm.model";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('comercio')
export class ComercioTypeOrmModel extends BaseTypeOrmModel {
    @Column({ unique: true })
    url: string;

    @OneToMany(() => CategoriaTypeOrmModel, categoria => categoria.comercio)
    categorias: CategoriaTypeOrmModel[];

    /** Categoría a donde van a parar los items sin categoria */
    @OneToOne(() => CategoriaTypeOrmModel, { eager: true }) @JoinColumn()
    categoriaDefecto: CategoriaTypeOrmModel;

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercioTypeOrmModel, usuarioComercio => usuarioComercio.comercio,
     { nullable: true })
    usuarioComercios: UsuarioComercioTypeOrmModel[];
}