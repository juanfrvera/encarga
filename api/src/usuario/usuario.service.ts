import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { UsuarioStorage } from './storage/usuario.storage';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly storage: UsuarioStorage
    ) { }

    public getByIdWithUsuarioComercioList(usuarioId: string): Promise<Usuario> {
        return this.storage.getByIdWithUsuarioComercioList(usuarioId);
    }

    public getByMail(mail: string) {
        return this.storage.getByMail(mail);
    }
}
