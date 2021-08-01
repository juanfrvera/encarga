import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../data/item/item.dto';
import { ItemFilter } from '../data/item/item-filter';
import { ItemList } from '../data/item/item-list';
import { ApiService } from './instance/api.service';
import { CrudService } from './instance/crud.service';
import { Item } from '../data/item/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends CrudService<Item, IItem, ItemList, ItemFilter>{
  constructor(http: HttpClient) {
    super(new ApiService(http, 'items/'));
  }

  protected fromDto(dto: IItem) {
    return Item.fromDto(dto);
  }
  protected fromListDto(dto: ItemList) {
    return Item.fromListDto(dto);
  }
  toDto(entity: Item) {
    return Item.toDto(entity);
  }
}
