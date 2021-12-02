import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ComercianteAuthGuard } from 'src/auth/guard/comerciante-auth.guard';
import { EntityNotFoundError } from 'typeorm';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemUpdateData } from './data/item.update.data';
import { ItemLightDto } from './dto/item-light.dto';
import { ItemDto } from './dto/item.dto';
import { ItemCreationData } from './data/item.creation.data';

@Controller('item')
export class ItemController {
  constructor(
    private readonly service: ItemService
    ) { }

  @UseGuards(ComercianteAuthGuard)
  @Post()
  async create(@Body() dto: CreateItemDto) {
    const creationData : ItemCreationData = {
      titulo: dto.titulo,
      precio: dto.precio,
      descripcion: dto.descripcion
    };

    const entity = await this.service.create(creationData);

    return this.toDto(entity);
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const entity = await this.service.getById(id);

    return this.toDto(entity);
  }

  @UseGuards(ComercianteAuthGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    const data : ItemUpdateData = {
      titulo: dto.titulo,
      precio: dto.precio,
      descripcion: dto.descripcion,
    };

    try {
      const entity = await this.service.update(id, data);

      return this.toLightDto(entity);
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
  public async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  private toDto(entity:Item) : ItemDto{
    return {
      id: entity.id,
      titulo: entity.name,
      precio: entity.price,
      descripcion: entity.description
    };
  }
  private toLightDto(entity: Item) : ItemLightDto{
    return {
      id: entity.id,
      titulo: entity.name,
      precio: entity.price,
      descripcion: entity.description,
    };
  }
}
