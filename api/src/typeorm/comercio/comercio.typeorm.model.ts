import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { UsuarioComercioTypeOrmModel } from "src/typeorm/usuario-comercio/usuario-comercio.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";
import { ComercioCategoriaTypeOrmModel } from "../comercio-categoria/comercio-categoria.typeorm.model";

@Entity('comercio')
export class ComercioTypeOrmModel extends BaseTypeOrmModel {
    @Column({ unique: true })
    url: string;

    @OneToMany(() => ComercioCategoriaTypeOrmModel, comercioCategoria => comercioCategoria.comercio)
    comercioCategoriaList: Array<ComercioCategoriaTypeOrmModel>;

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercioTypeOrmModel, usuarioComercio => usuarioComercio.comercio,
        { nullable: true })
    usuarioComercioList: UsuarioComercioTypeOrmModel[];
}