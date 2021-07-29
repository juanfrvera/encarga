import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../data/item/item';
import { ItemList } from '../data/item/item-list';
import { ApiService } from './api.service';
import { CrudService } from './instance/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends CrudService<Item, ItemList>{
  constructor(http: HttpClient) {
    super(new ApiService(http, 'items/'));
  }

  /**
   * Devuelve los items cuyos ids coincidan
   * @param listaIds Lista de ids de items requeridos
   * @returns Items que coincidan
   */
  public getItemsByIds(listaIds: string[]) {
    return this.api.getWithFilter({ listaIds });
  }
}
