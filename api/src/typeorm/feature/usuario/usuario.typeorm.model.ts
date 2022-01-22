import { BaseTypeOrmModel } from "src/typeorm/feature/base/base.typeorm.model";
import { UsuarioComercioTypeOrmModel } from "src/typeorm/feature/usuario-comercio/usuario-comercio.typeorm.model";
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