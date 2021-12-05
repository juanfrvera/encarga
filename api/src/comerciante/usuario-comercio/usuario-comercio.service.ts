import { Injectable } from '@nestjs/common';
import { UsuarioComercio } from './entities/usuario-comercio.entity';
import { UsuarioComercioStorage } from './usuario-comercio.storage';

@Injectable()
export class UsuarioComercioService {
    constructor(
        private readonly storage: UsuarioComercioStorage
    ) { }

    public getListByUsuario(usuarioId: string): Promise<UsuarioComercio[]> {
        return this.storage.getListByUsuario(usuarioId);
    }

    public isUsuarioFromComercio(usuarioId: string, comercioId: string): Promise<boolean> {
        return this.storage.existWithUsuarioAndComercio(usuarioId, comercioId);
    }
}
