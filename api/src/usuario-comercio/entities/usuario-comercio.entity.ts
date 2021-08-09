import { Comercio } from "src/comercios/entities/comercio.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, ManyToOne } from "typeorm";

// Se hizo esta clase de asociación pensando en que en un futuro se pueden agregar roles para usuarios
@Entity()
export class UsuarioComercio {
    @ManyToOne(() => Comercio, comercio => comercio.usuarioComercios, { primary: true, eager: true })
    comercio: Comercio;

    @ManyToOne(() => Usuario, usuario => usuario.usuarioComercios, { primary: true, eager: true })
    usuario: Usuario;
}