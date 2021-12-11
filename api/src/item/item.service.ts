import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemCreationData } from './data/item.creation.data';
import { ItemStorage } from './item.storage';
import { ItemUpdateData } from './data/item.update.data';
import { ItemNotFoundError } from './error/item-not-found.error';
import { ItemFilter } from './data/item.filter';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';

@Injectable()
export class ItemService {
  constructor(
    private readonly storage: ItemStorage,
  ) { }

  public countByComercio(comercioId: string): Promise<number> {
    return this.storage.countByComercio(comercioId);
  }

  public create(data: ItemCreationData) {
    return this.storage.create(data);
  }

  public async deleteById(id: string, transaction?: TransactionProxy) {
    await this.storage.deleteById(id, transaction);
  }

  public async getById(id: string): Promise<Item> {
    if (await this.storage.exists(id)) {
      return this.storage.get(id);
    }
    else {
      throw new ItemNotFoundError();
    }
  }

  public getList(filter: ItemFilter): Promise<Array<Item>> {
    return this.storage.getList(filter);
  }

  public getListByComercio(comercioId: string): Promise<Array<Item>> {
    return this.storage.getListByComercio(comercioId);
  }

  public async remove(id: string): Promise<void> {
    if (this.storage.exists(id)) {
      await this.storage.remove(id);
    }
    else {
      throw new ItemNotFoundError();
    }
  }

  public async update(data: ItemUpdateData): Promise<Item> {
    if (!this.storage.exists(data.id)) throw new ItemNotFoundError();

    const entity = await this.storage.update(data.id, data);

    return entity;
  }
}
