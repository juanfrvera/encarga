import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private readonly repo: Repository<Item>) { }

  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.repo.save(createItemDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const original = await this.repo.findOne(id);

    const updated: Item = {
      ...original,
      ...updateItemDto
    };

    await this.repo.save(updated);

    return updated;
  }

  remove(id: number) {
    const item = this.repo.findOne(id);
    this.repo.delete(id);

    return item;
  }

  findAllWithFilter(filter: { listaIds: number[] }) {
    return this.repo.findByIds(filter.listaIds);
  }
}
