import { BaseTypeOrmModel } from "src/base/storage/base.typeorm.model";
import { UsuarioComercioTypeOrmModel } from "src/usuario-comercio/storage/usuario-comercio.typeorm.model";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('usuario')
export class UsuarioTypeOrmModel extends BaseTypeOrmModel{
    @Column({ unique: true })
    mail: string;

    @Column()
    password: string;

    /** Comercios que este usuario puede administrar */
    @OneToMany(() => UsuarioComercioTypeOrmModel, usuarioComercio => usuarioComercio.usuario, { nullable: true })
    usuarioComercios: UsuarioComercioTypeOrmModel[];
}