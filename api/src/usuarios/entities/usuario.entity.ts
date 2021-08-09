import { Base } from "src/base/entities/base.entity";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Usuario extends Base {
    @Column({ unique: true })
    mail: string;

    @Column()
    password: string;

    /** Comercios que este usuario puede administrar */
    @OneToMany(() => UsuarioComercio, usuarioComercio => usuarioComercio.usuario, { nullable: true })
    usuarioComercios: UsuarioComercio[];
}