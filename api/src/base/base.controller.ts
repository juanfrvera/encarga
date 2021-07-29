import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity';

@Controller('base')
export abstract class BaseController<Entity extends Base, CreateDto extends CreateBaseDto, UpdateDto extends UpdateBaseDto> {
  constructor(protected readonly service: BaseService<Entity, CreateDto, UpdateDto>) { }

  @Post()
  async create(@Body() createDto: CreateDto) {
    return (await this.service.create(createDto)).toDto();
  }

  @Get()
  async findAll() {
    return (await this.service.findAll()).map(e => e.toListDto());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return (await this.service.findOne(+id)).toDto();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return (await this.service.update(+id, updateDto)).toDto();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (await this.service.remove(+id)).toDto();
  }

  @Post('filter')
  async findAllWithFilter(@Body() filter: any) {
    return (await this.service.findAllWithFilter(filter)).map(e => e.toListDto());
  }
}
