import { Injectable } from '@nestjs/common';
import { UsuarioStorage } from './usuario.storage';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly storage: UsuarioStorage
    ) { }

    public getByMail(mail: string) {
        return this.storage.getByMail(mail);
    }
}
