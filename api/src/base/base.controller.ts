import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { EntityNotFoundError } from 'typeorm';
import { BaseService } from './base.service';
import { BaseFilter } from './data/base-filter';
import { BaseListDto } from './dto/base-list.dto';
import { BaseDto } from './dto/base.dto';
import { CreateBaseDto } from './dto/create-base.dto';
import { Base } from './entities/base.entity';

@Controller('base')
export abstract class BaseController<
  Entity extends Base, CreateDto extends CreateBaseDto,
  Dto extends BaseDto, ListDto extends BaseListDto, Filter extends BaseFilter> {
  constructor(protected readonly service: BaseService<Entity, CreateDto, Filter>) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateDto) {
    return this.toDto(await this.service.create(createDto));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.toDto(await this.service.findOne(+id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateDto>) {
    try {
      return this.toDto(await this.service.update(+id, updateDto));
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('El elemento a editar no existe', HttpStatus.NOT_FOUND);
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

  abstract toDto(entity: CreateDto & Entity | Entity): Dto;
  abstract toListDto(entity: Entity): ListDto;
}
