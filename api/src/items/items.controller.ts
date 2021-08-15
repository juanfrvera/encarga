import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item-filter';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ComerciosService } from 'src/comercios/comercios.service';
import { CategoriasService } from 'src/categorias/categorias.service';

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

    if (createDto.idsCategorias && createDto.idsCategorias.length) {
      await this.validarCategorias(idComercio, createDto.idsCategorias);
    }
    // Si no se pasaron idsCategorias, usar la categoría por defecto del comercio
    else {
      createDto.idsCategorias = [await this.getIdCategoriaDefecto(idComercio)];
    }

    return this.toDto(await this.service.create(createDto));
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

    if (updateDto.idsCategorias) {
      // Si se pasaron ids, validarlos
      if (updateDto.idsCategorias.length) {
        await this.validarCategorias(idComercio, updateDto.idsCategorias);
      }
      // Si se pasó una lista vacía es porque se quieren eliminar todas
      else {
        // Dejar la categoría por defecto
        updateDto.idsCategorias = [await this.getIdCategoriaDefecto(idComercio)];
      }
    }


    return this.toDto(await this.service.update(+id, updateDto));
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

  /** Tira excepción si hay categorías inválidas */
  private async validarCategorias(idComercio: number, idsCategorias: number[]) {
    const validas = await this.categoriasService.existenYSonDeComercio(
      idsCategorias,
      idComercio);

    if (validas) {
      return idsCategorias;
    }
    // Si hay categorías que no son de este comercio, se tira excepción
    else {
      throw new HttpException('Categoría desconocida', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
