import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../data/item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly api: ApiService<Item>;

  private items: Item[];

  public get Items(): Observable<Item[]> {
    if (this.items)
      return of(this.items);
    else
      return this.getAll().pipe((observable) => {
        observable.subscribe(items => this.items = items);
        return observable;
      });
  }

  constructor(http: HttpClient) {
    this.api = new ApiService(http, 'item/');
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
    this.api.create(itemSinId).subscribe((itemServer) => {
      if (this.items) {
        this.items.unshift(itemServer);
      }
    }, error => {
      console.error(error);
    });
  }

  /** Edita un item */
  public edit(item: Item) {
    this.api.updateById(item.id, item).subscribe(() => {
      if (this.items) {
        const index = this.items.findIndex(i => i.id === item.id);
        this.items[index] = item;
      }
    }, error => {
      console.error(error);
    });
  }

  /** Elimina un item */
  public delete(item: Item) {
    this.api.deleteById(item.id).subscribe(() => {
      if (this.items) {
        const index = this.items.findIndex(i => i.id === item.id);
        this.items.splice(index, 1);
      }
    }, error => {
      console.error(error);
    });
  }

  private getAll() {
    return this.api.getAll();
  }
}
