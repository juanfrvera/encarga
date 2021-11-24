import { Usuario } from "./entities/usuario.entity";

export abstract class UsuarioStorage {
    public abstract getByIdWithUsuarioComercioList(usuarioId: string): Promise<Usuario>;
    public abstract getByMail(mail: string): Promise<Usuario>;
}