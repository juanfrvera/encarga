import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class UsuarioComercioService {
    constructor(private readonly usuariosService: UsuariosService) { }

    async getComercioDeUsuario(idUsuario: number) {
        // Cargar el usuario junto con las relaciones de usuarioComercio
        const usuario = await this.usuariosService.findOne(idUsuario, ['usuarioComercios']);

        // Por ahora solo tendrá un comercio
        return usuario.usuarioComercios[0].comercio;
    }
}
