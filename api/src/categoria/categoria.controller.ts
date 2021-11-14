import { Controller } from '@nestjs/common';
import { ComerciosService } from 'src/comercio/comercio.service';
import { UsuarioComercioService } from 'src/usuario-comercio/usuario-comercio.service';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly service: CategoriaService,
    private readonly comercioService: ComerciosService,
    private readonly usuarioComercioService: UsuarioComercioService) {
  }
}
