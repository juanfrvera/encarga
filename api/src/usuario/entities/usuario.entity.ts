import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";

export class Usuario {
    mail: string;
    password: string;

    /** Comercios que este usuario puede administrar */
    usuarioComercios: UsuarioComercio[];
}