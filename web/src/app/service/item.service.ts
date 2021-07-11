import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly api: ApiService<Item>;

  private items: Item[] = [];

  public get Items() {
    return this.items;
  }

  constructor(http: HttpClient) {
    this.api = new ApiService(http, 'item/');

    this.api.getAll().subscribe(lista => {
      this.items = lista;
    }, error => {
      console.error(error);
    });
  }

  public getAll() {
    return this.api.getAll();
  }

  public getItemsByIds(itemIds?: string[]) {
    if (itemIds) {
      return this.Items.filter(item => itemIds.includes(item.id));
    }
    else { return this.Items; }
  }

  /** Agrega un item al array de items */
  public create(item: Item) {
    this.api.create(item).subscribe(() => {
      this.Items.push(item);
    }, error => {
      console.error(error);
    });
  }
}
