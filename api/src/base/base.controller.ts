import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Post()
  async create(@Body() createDto: CreateDto) {
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateDto>) {
    return this.toDto(await this.service.update(+id, updateDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.toDto(await this.service.remove(+id));
  }

  @Post('filter')
  async findAllWithFilter(@Body() filter: Filter) {
    return (await this.service.findAllWithFilter(filter)).map(e => this.toListDto(e));
  }

  abstract toDto(entity: CreateDto & Entity | Entity): Dto;
  abstract toListDto(entity: Entity): ListDto;
}
