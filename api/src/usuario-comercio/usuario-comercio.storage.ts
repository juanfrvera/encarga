import { UsuarioComercio } from "./entities/usuario-comercio.entity";

export abstract class UsuarioComercioStorage{
    public abstract getListByUsuario(usuarioId: string): Promise<UsuarioComercio[]>
}