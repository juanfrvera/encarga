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

    // Obtiene todos los items del servidor y los coloca en la lista de items
    this.api.getAll().subscribe(lista => {
      this.items = lista;
    }, error => {
      console.error(error);
    });
  }

  public getAll() {
    return this.api.getAll();
  }

  /**
   * Devuelve los items cuyos ids coincidan
   * @param listaIds Lista de ids de items requeridos
   * @returns Items que coincidan
   */
  public getItemsByIds(listaIds: string[]) {
    return this.api.getWithFilter({ listaIds });
  }

  /** Crea un nuevo item */
  public create(itemSinId) {
    this.api.create(itemSinId).subscribe(() => {
      this.Items.unshift(itemSinId);
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
