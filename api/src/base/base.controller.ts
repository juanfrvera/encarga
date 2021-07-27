import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity';

@Controller('base')
export abstract class BaseController<Entity extends Base, CreateDto extends CreateBaseDto, UpdateDto extends UpdateBaseDto> {
  constructor(private readonly baseService: BaseService<Entity, CreateDto, UpdateDto>) { }

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.baseService.create(createDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.baseService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }

  @Post('filter')
  findAllWithFilter(@Body() filter: any) {
    return this.baseService.findAllWithFilter(filter);
  }
}
