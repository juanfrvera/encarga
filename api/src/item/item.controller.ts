import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotAcceptableException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemFilterDto } from './dto/item-filter.dto';
import { ComercianteAuthGuard } from 'src/auth/guard/comerciante-auth.guard';
import { ComerciosService } from 'src/comercio/comercio.service';
import { CategoriaService } from 'src/categoria/categoria.service';
import { Util } from 'src/util';
import { EntityNotFoundError } from 'typeorm';
import { UsuarioComercioService } from 'src/usuario-comercio/usuario-comercio.service';
import { ComercioOVisitaGuard } from 'src/auth/guard/comerciante-o-usuario.guard';

@Controller('item')
export class ItemController {
  constructor(
    private readonly service: ItemService,
    private readonly categoriasService: CategoriaService,
    private readonly comerciosService: ComerciosService,
    private readonly usuarioComercioService: UsuarioComercioService) { }

  @UseGuards(ComercianteAuthGuard)
  @Post()
  async create(@Body() createDto: CreateItemDto, @Request() req) {
    const idUsuario = req.user.userId;
    const comercio = await this.usuarioComercioService.getComercioByUsuario(idUsuario);
    const idCategoriaDefecto = comercio.categoriaDefecto.id;

    if (createDto.idsCategorias && createDto.idsCategorias.length) {
      await this.validarCategorias(comercio.id, createDto.idsCategorias, idCategoriaDefecto);
    }
    else {
      // Si queda huerfano, agregarlo a la categoría defecto
      createDto.idsCategorias = [idCategoriaDefecto];
    }

    const entidad = await this.service.create(createDto);

    // Se saca la categoría por defecto ya que es transparente para los clientes
    this.sacarCategoriaDefecto(entidad, idCategoriaDefecto);

    return this.toDto(entidad);
  }

  @Get()
  @UseGuards(ComercioOVisitaGuard)
  async findAll() {
    return (await this.service.findAll()).map(e => this.toListDto(e));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.toDto(await this.service.findOne(+id));
  }

  @UseGuards(ComercianteAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateItemDto>, @Request() req) {
    const idUsuario = req.user.userId;
    const comercio = await this.usuarioComercioService.getComercioByUsuario(idUsuario);
    const idCategoriaDefecto = comercio.categoriaDefecto.id;

    // Solo se retocan las categorías si el patch las trata
    if (updateDto.idsCategorias) {
      if (updateDto.idsCategorias.length) {
        await this.validarCategorias(comercio.id, updateDto.idsCategorias, idCategoriaDefecto);
      }
      // Si se quieren eliminar todas las categorías, dejarlo con la categoría defecto
      else {
        updateDto.idsCategorias = [idCategoriaDefecto];
      }
    }

    try {
      const entidad = await this.service.update(+id, updateDto);
      // Se saca la categoría por defecto ya que es transparente para los clientes
      this.sacarCategoriaDefecto(entidad, idCategoriaDefecto);

      return this.toDto(entidad);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('El item que quiere editar no existe', HttpStatus.NOT_FOUND);
      }
      else {
        throw error;
      }
    }

  }

  @UseGuards(ComercianteAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.toDto(await this.service.remove(+id));
  }

  @UseGuards(ComercioOVisitaGuard)
  @Post('filter')
  async findAllWithFilter(@Body() filter: ItemFilterDto) {
    return (await this.service.findAllWithFilter(filter)).map(e => this.toListDto(e));
  }

  toDto(entity: CreateItemDto & Item | Item) {
    return Item.toDto(entity);
  }
  toListDto(entity: Item) {
    return Item.toListDto(entity);
  }

  private getComercio(@Request() req) {
    const idUsuario = req.user.userId;
    return this.usuarioComercioService.getComercioByUsuario(idUsuario);
  }

  private async getIdCategoriaDefecto(idComercio: number) {
    const comercio = await this.comerciosService.findOne(idComercio, ['categoriaDefecto']);
    return comercio.categoriaDefecto.id;
  }

  private sacarCategoriaDefecto(entidad: Item, idCategoriaDefecto) {
    if (entidad.itemCategorias) {
      const indexDefecto = entidad.itemCategorias.findIndex(
        ic => ic.categoria.id == idCategoriaDefecto);

      // Eliminar la categoría por defecto solo si está en la lista
      if (indexDefecto != -1) {
        Util.eliminarEn(entidad.itemCategorias, indexDefecto);
      }
    }

    // No devolver lista si no tiene nada
    if (entidad.itemCategorias && !entidad.itemCategorias.length) {
      entidad.itemCategorias = undefined;
    }
  }

  /**
   * Valida que las categorías sean correctas
   * @param idComercio 
   * @param idsCategorias 
   * @param idCategoriaDefecto 
   * @returns Categorías + categoría por defecto
   */
  private async validarCategorias(idComercio: number, idsCategorias: number[], idCategoriaDefecto: number) {
    if (idsCategorias.includes(idCategoriaDefecto)) {
      throw new HttpException('No puede elegir la categoría por defecto', HttpStatus.NOT_ACCEPTABLE);
    }


    const validas = await this.categoriasService.existenYSonDeComercio(idsCategorias, idComercio);

    if (!validas) {
      // Si hay categorías que no son de este comercio, se tira excepción
      throw new HttpException('Categoría desconocida', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
