import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemCreationData } from './data/item.creation.data';
import { ItemStorage } from './item.storage';
import { ItemUpdateData } from './data/item.update.data';
import { ItemNotFoundError } from './error/item-not-found.error';

@Injectable()
export class ItemService {
  constructor(
    private readonly storage: ItemStorage,
  ) { }

  public async create(data: ItemCreationData) {
    return this.storage.create(data);
  }

  public async getById(id: string){
    if(await this.storage.exists(id)){
      return this.storage.get(id);
    }
    else{
      throw new ItemNotFoundError();
    }
  }

  public async remove(id: string) : Promise<void>{
    if(this.storage.exists(id)){
        await this.storage.remove(id);
    }
    else{
      throw new ItemNotFoundError();
    }
  }

  public async update(id: string, data: ItemUpdateData) : Promise<Item> {
    if(!this.storage.exists(id)) throw new ItemNotFoundError();

    const entity = await this.storage.update(id, data);

    return entity;
  }
}
