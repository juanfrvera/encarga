import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaFilter } from './data/categoria-filter';
import { CategoriaListDto } from './dto/categoria-list.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriasController extends BaseController<
Categoria, CreateCategoriaDto, CategoriaDto, CategoriaListDto, CategoriaFilter> {
  constructor(readonly categoriasService: CategoriasService) {
    super(categoriasService);
  }

  @Get('urlComercio/:url')
  async getByComercio(@Param('url') urlComercio: string) {
    const lista = await this.service.findAllWithFilter({ urlComercio });

    return lista.map(c => this.toListDto(c));
  }

  toDto(entity: CreateCategoriaDto & Categoria | Categoria) {
    return Categoria.toDto(entity);
  }
  toListDto(entity: Categoria) {
    return Categoria.toListDto(entity);
  }
}
