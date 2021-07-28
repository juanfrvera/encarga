import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService extends BaseService<Item, CreateItemDto, UpdateItemDto> {
  constructor(@InjectRepository(Item) readonly itemsRepository: Repository<Item>) {
    super(itemsRepository);
  }
}
