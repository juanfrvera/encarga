import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class UsuarioComercioService {
    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    async getComercioByUsuario(usuarioId: string) {
        // Cargar el usuario junto con las relaciones de usuarioComercio
        const usuario = await this.usuarioService.getByIdWithUsuarioComercioList(usuarioId);

        // Por ahora solo tendrá un comercio
        return usuario.usuarioComercios[0].comercio;
    }
}
