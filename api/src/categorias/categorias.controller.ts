import { Controller, Get, NotFoundException, Param, Request, UseGuards } from '@nestjs/common';
import { ComercioOVisitaGuard } from 'src/auth/guard/comerciante-o-usuario.guard';
import { BaseController } from 'src/base/base.controller';
import { ComerciosService } from 'src/comercios/comercios.service';
import { Comercio } from 'src/comercios/entities/comercio.entity';
import { UsuarioComercioService } from 'src/usuario-comercio/usuario-comercio.service';
import { Util } from 'src/util';
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

    return this._getByUrlComercio(comercio.url);
  }

  @Get()
  async findAllUrl() {
    console.log("find all url");
  }

  @Get('urlComercio/:url')
  async getByComercio(@Param('url') urlComercio: string) {
    const listaDtos = await this._getByUrlComercio(urlComercio);

    if (listaDtos && listaDtos.length) {
      // Cambiar el nombre de la categoría por defecto a "Otros" cuando hay más de una
      if (listaDtos.length > 1) {
        // Cargamos el comercio para saber cual es la categoría por defecto
        const comercio = await this.comercioService.findOneByUrl(urlComercio, ['categoriaDefecto']);

        const categoriaDefecto = listaDtos.find(c => c.id == comercio.categoriaDefecto.id);

        categoriaDefecto.nombre = 'Otros';
      }
      else {
        // La única categoría es la por defecto
        listaDtos[0].nombre = 'Todos';
      }
    }

    return listaDtos;
  }

  toDto(entity: CreateCategoriaDto & Categoria | Categoria) {
    return Categoria.toDto(entity);
  }
  toListDto(entity: Categoria) {
    return Categoria.toListDto(entity);
  }

  private async _getByUrlComercio(urlComercio: string) {
    const lista = await this.service.findAllWithFilter({ urlComercio });
    return lista.map(c => this.toListDto(c));
  }
}
