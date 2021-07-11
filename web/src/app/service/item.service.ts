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

  /** Obtiene la lista de categorias */
  public get Categorias() {
    return [{ titulo: 'Todo', items: this.Items }];
  }

  constructor(http: HttpClient) {
    this.api = new ApiService(http, 'item/');

    // Obtiene todos los items del servidor y los coloca en la lista de items
    this.api.getAll().subscribe(lista => {
      this.items = lista;
    }, error => {
      console.error(error);
    });
  }

  /** Obtiene los items por id */
  public getItemsByIds(itemIds?: string[]) {
    if (itemIds) {
      return this.Items.filter(item => itemIds.includes(item.id));
    }
    else { return this.Items; }
  }

  /** Crea un nuevo item */
  public create(item: Item) {
    this.api.create(item).subscribe(() => {
      this.Items.push(item);
    }, error => {
      console.error(error);
    });
  }

  /** Edita un item */
  public edit(item: Item) {
    this.api.updateById(item.id, item).subscribe(() => {
      const index = this.Items.findIndex(i => i.id === item.id);
      this.Items[index] = item;      
    }, error => {
      console.error(error);
    });
  }

  public delete(item: Item) {
    this.api.deleteById(item.id).subscribe(() => {
      const index = this.Items.findIndex(i => i.id === item.id);
      this.items.splice(index, 1);
    }, error => {
      console.error(error);
    });
  }

}
