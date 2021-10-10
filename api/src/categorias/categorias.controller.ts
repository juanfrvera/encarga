import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ComercioOVisitaGuard } from 'src/auth/guard/comerciante-o-usuario.guard';
import { BaseController } from 'src/base/base.controller';
import { ComerciosService } from 'src/comercios/comercios.service';
import { Comercio } from 'src/comercios/entities/comercio.entity';
import { UsuarioComercioService } from 'src/usuario-comercio/usuario-comercio.service';
import { CategoriasService } from './categorias.service';
import { CategoriaFilter } from './data/categoria-filter';
import { CategoriaListDto } from './dto/categoria-list.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriasController extends BaseController<
Categoria, CreateCategoriaDto, CategoriaDto, CategoriaListDto, CategoriaFilter> {
  constructor(
    readonly categoriasService: CategoriasService,
    private readonly comercioService: ComerciosService,
    private readonly usuarioComercioService: UsuarioComercioService) {
    super(categoriasService);
  }

  @UseGuards(ComercioOVisitaGuard)
  @Get()
  async findAll(@Request() req) {
    const comercio = await this._getComercio(req);

    return this._get({ urlComercio: comercio.url });
  }

  @UseGuards(ComercioOVisitaGuard)
  @Post('filter')
  async findAllWithFilter(@Body() filter: CategoriaFilter, @Request() req) {
    const comercio = await this._getComercio(req);

    filter.urlComercio = comercio.url;

    return this._get(filter);
  }

  toDto(entity: CreateCategoriaDto & Categoria | Categoria) {
    return Categoria.toDto(entity);
  }
  toListDto(entity: Categoria) {
    return Categoria.toListDto(entity);
  }

  private async _getComercio(req) {
    const reqData = req.user;
    let comercio: Comercio;

    if (reqData.urlComercio) {
      comercio = await this.comercioService.findOneByUrl(reqData.urlComercio);

      if (!comercio) throw new NotFoundException('Comercio no encontrado con la URL indicada');
    }
    else {
      comercio = await this.usuarioComercioService.getComercioDeUsuario(reqData.userId);

      if (!comercio) throw new NotFoundException('No se encontró un comercio para este usuario');
    }

    return comercio;
  }

  private async _get(filter?: CategoriaFilter) {
    const lista = await this.service.findAllWithFilter(filter);
    return lista.map(c => this.toListDto(c));
  }
}
