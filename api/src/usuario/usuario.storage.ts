import { Usuario } from "./entities/usuario.entity";

export abstract class UsuarioStorage {
    public abstract get(usuarioId: string): Promise<Usuario>;
    public abstract getByMail(mail: string): Promise<Usuario>;
}