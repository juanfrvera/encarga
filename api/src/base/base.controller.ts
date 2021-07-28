import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity';

@Controller('base')
export abstract class BaseController<Entity extends Base, CreateDto extends CreateBaseDto, UpdateDto extends UpdateBaseDto> {
  constructor(protected readonly service: BaseService<Entity, CreateDto, UpdateDto>) { }

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Post('filter')
  findAllWithFilter(@Body() filter: any) {
    return this.service.findAllWithFilter(filter);
  }
}
