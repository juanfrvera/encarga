import { Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { BaseController } from 'src/base/base.controller';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item-filter';
import { ItemDto } from './dto/item.dto';
import { ItemListDto } from './dto/item-list.dto';

@Controller('items')
export class ItemsController extends BaseController<Item, CreateItemDto, ItemDto, ItemListDto, ItemFilter> {
  constructor(readonly itemsService: ItemsService) {
    super(itemsService);
  }

  toDto(entity: CreateItemDto & Item | Item) {
    return Item.toDto(entity);
  }
  toListDto(entity: Item) {
    return Item.toListDto(entity);
  }
}
