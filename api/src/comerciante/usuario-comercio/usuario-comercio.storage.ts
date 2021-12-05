import { UsuarioComercio } from "./entities/usuario-comercio.entity";

export abstract class UsuarioComercioStorage {
    public abstract existWithUsuarioAndComercio(usuarioId: string, comercioId: string): Promise<boolean>;
    public abstract getListByUsuario(usuarioId: string): Promise<UsuarioComercio[]>
}