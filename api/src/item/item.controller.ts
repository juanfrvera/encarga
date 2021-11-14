import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
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
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemUpdateData } from './data/item.update.data';
import { ItemLightDto } from './dto/item-light.dto';
import { ItemDto } from './dto/item.dto';

@Controller('item')
export class ItemController {
  constructor(
    private readonly service: ItemService,
    private readonly categoriaService: CategoriaService,
    private readonly comercioService: ComerciosService,
    private readonly usuarioComercioService: UsuarioComercioService) { }

  @UseGuards(ComercianteAuthGuard)
  @Post()
  async create(@Body() createDto: CreateItemDto, @Request() req) {
    const idUsuario = req.user.userId;

    const entity = await this.service.create(createDto);

    // Se saca la categoría por defecto ya que es transparente para los clientes
    this.sacarCategoriaDefecto(entity, idCategoriaDefecto);

    return this.toDto(entity);
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const entity = await this.service.getById(id);

    return this.toDto(entity);
  }

  @UseGuards(ComercianteAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateItemDto, @Request() req) {
    const usuarioId :string = req.user.userId;
    
    const data : ItemUpdateData = {
      titulo: dto.titulo,
      precio: dto.precio,
      descripcion: dto.descripcion,
      categoriaIdList: dto.categoriaIdList
    };

    try {
    const entity = await this.service.update(id, data, usuarioId);

    return this.toLightDto(entity);

      return this.toDto(entity);
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
    return (await this.service.findAllWithFilter(filter)).map(e => this.toLightDto(e));
  }

  private toDto(entity:Item) : ItemDto{
    return {
      id: entity.id,
      titulo: entity.titulo,
      precio: entity.precio,
      descripcion: entity.descripcion,
      categoriaIdList: entity.itemCategoriaList?.map(ic => ic.categoria.id)
    };
  }
  private toLightDto(entity: Item) : ItemLightDto{
    return {
      id: entity.id,
      titulo: entity.titulo,
      precio: entity.precio,
      descripcion: entity.descripcion,
    };
  }

  private getComercio(@Request() req) {
    const idUsuario = req.user.userId;
    return this.usuarioComercioService.getComercioByUsuario(idUsuario);
  }

  private async getIdCategoriaDefecto(idComercio: number) {
    const comercio = await this.comercioService.findOne(idComercio, ['categoriaDefecto']);
    return comercio.categoriaDefecto.id;
  }
}
