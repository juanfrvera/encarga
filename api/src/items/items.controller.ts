import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BaseController } from 'src/base/base.controller';
import { Item } from './entities/item.entity';

@Controller('items')
export class ItemsController extends BaseController<Item, CreateItemDto, UpdateItemDto> {
  constructor(readonly itemsService: ItemsService) {
    super(itemsService);
  }
}
