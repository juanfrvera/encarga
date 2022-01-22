import { BaseTypeOrmModel } from "src/typeorm/feature/base/base.typeorm.model";
import { UsuarioComercioTypeOrmModel } from "src/typeorm/feature/usuario-comercio/usuario-comercio.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";
import { ComercioCategoriaTypeOrmModel } from "../comercio-categoria/comercio-categoria.typeorm.model";

@Entity('comercio')
export class ComercioTypeOrmModel extends BaseTypeOrmModel {
    @Column({ nullable: true })
    phone: string;

    @Column({ unique: true })
    url: string;

    @OneToMany(() => ComercioCategoriaTypeOrmModel, comercioCategoria => comercioCategoria.comercio)
    comercioCategoriaList: Array<ComercioCategoriaTypeOrmModel>;

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercioTypeOrmModel, usuarioComercio => usuarioComercio.comercio,
        { nullable: true })
    usuarioComercioList: UsuarioComercioTypeOrmModel[];
}