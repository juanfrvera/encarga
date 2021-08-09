import { Controller } from '@nestjs/common';
import { UsuarioComercioService } from './usuario-comercio.service';

@Controller('usuario-comercio')
export class UsuarioComercioController {
  constructor(private readonly usuarioComercioService: UsuarioComercioService) {}
}
