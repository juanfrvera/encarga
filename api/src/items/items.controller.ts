import { Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BaseController } from 'src/base/base.controller';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item-filter';

@Controller('items')
export class ItemsController extends BaseController<Item, CreateItemDto, UpdateItemDto, ItemFilter> {
  constructor(readonly itemsService: ItemsService) {
    super(itemsService);
  }
}
