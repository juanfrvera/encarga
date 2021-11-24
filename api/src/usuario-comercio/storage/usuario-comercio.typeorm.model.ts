import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { ComercioTypeOrmModel } from "src/typeorm/comercio/comercio.typeorm.model";
import { UsuarioTypeOrmModel } from "src/typeorm/usuario/usuario.typeorm.model";
import { Entity, ManyToOne } from "typeorm";

// Se hizo esta clase de asociación pensando en que en un futuro se pueden agregar roles para usuarios
@Entity('usuario_comercio')
export class UsuarioComercioTypeOrmModel extends BaseTypeOrmModel {
    @ManyToOne(() => ComercioTypeOrmModel, comercio => comercio.usuarioComercioList, { primary: true, eager: true })
    comercio: ComercioTypeOrmModel;

    @ManyToOne(() => UsuarioTypeOrmModel, usuario => usuario.usuarioComercios, { primary: true, eager: true })
    usuario: UsuarioTypeOrmModel;
}