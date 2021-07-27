import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriasController extends BaseController<Categoria, CreateCategoriaDto, UpdateCategoriaDto> {
  constructor(private readonly categoriasService: CategoriasService) {
    super(categoriasService);
  }
}
