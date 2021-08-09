import { Base } from "src/base/entities/base.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Comercio extends Base {
    @Column({ unique: true })
    url: string;

    @OneToMany(() => Categoria, categoria => categoria.comercio)
    categorias: Categoria[];

    /** Usuarios de este comercio */
    @OneToMany(() => UsuarioComercio, usuarioComercio => usuarioComercio.comercio, { nullable: true })
    usuarioComercios: UsuarioComercio[];
}