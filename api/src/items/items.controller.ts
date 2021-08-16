import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item-filter';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ComerciosService } from 'src/comercios/comercios.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { Util } from 'src/util';
import { EntityNotFoundError } from 'typeorm';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly service: ItemsService,
    private readonly categoriasService: CategoriasService,
    private readonly comerciosService: ComerciosService,
    private readonly usuariosService: UsuariosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateItemDto, @Request() req) {
    const idComercio = await this.getIdComercio(req);
    const idCategoriaDefecto = await this.getIdCategoriaDefecto(idComercio)

    if (createDto.idsCategorias && createDto.idsCategorias.length) {
      await this.validarCategorias(idComercio, createDto.idsCategorias, idCategoriaDefecto);
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
  async findAll() {
    return (await this.service.findAll()).map(e => this.toListDto(e));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.toDto(await this.service.findOne(+id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateItemDto>, @Request() req) {
    const idComercio = await this.getIdComercio(req);
    const idCategoriaDefecto = await this.getIdCategoriaDefecto(idComercio);

    // Solo se retocan las categorías si el patch las trata
    if (updateDto.idsCategorias) {
      if (updateDto.idsCategorias.length) {
        await this.validarCategorias(idComercio, updateDto.idsCategorias, idCategoriaDefecto);
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.toDto(await this.service.remove(+id));
  }

  @Post('filter')
  async findAllWithFilter(@Body() filter: ItemFilter) {
    return (await this.service.findAllWithFilter(filter)).map(e => this.toListDto(e));
  }

  toDto(entity: CreateItemDto & Item | Item) {
    return Item.toDto(entity);
  }
  toListDto(entity: Item) {
    return Item.toListDto(entity);
  }

  private async getIdComercio(@Request() req) {
    const userId = req.user.userId;

    // Cargar el usuario junto con las relaciones de usuarioComercio
    const usuario = await this.usuariosService.findOne(userId, ['usuarioComercios']);

    // Por ahora solo tendrá un comercio
    return usuario.usuarioComercios[0].comercio.id;
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
