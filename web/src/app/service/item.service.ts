import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../data/item/item.dto';
import { ItemFilter } from '../data/item/item-filter';
import { ItemList } from '../data/item/item-list';
import { ApiService } from './instance/api.service';
import { CrudService } from './instance/crud.service';
import { Item } from '../data/item/item';
import { Util } from '../util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends CrudService<Item, IItem, ItemList, ItemFilter>{
  private onItemUpdate = new Subject<{ nuevo: Item, viejo?: Item }>();
  private onItemUpdateObservable?: Observable<{ nuevo: Item, viejo?: Item }>;

  public get OnItemUpdate() {
    if (!this.onItemUpdateObservable) {
      this.onItemUpdateObservable = this.onItemUpdate.asObservable();
    }

    return this.onItemUpdateObservable;
  }

  constructor(http: HttpClient) {
    super(new ApiService(http, 'items/'));
  }

  public create(entity: Item) {
    const obs = super.create(entity);

    obs.subscribe(itemEnServer => {
    })

    return obs;
  }

  public edit(entity: Item) {
    // Valor viejo del item (sin edicion)
    const viejo = Util.copiaProfunda(this.lista.value?.find(i => i.id == entity.id));

    const obs = super.edit(entity);

    obs.subscribe(itemEnServer => {
      this.onItemUpdate.next({ nuevo: itemEnServer, viejo: viejo });
    });

    return obs;
  }

  protected fromDto(dto: IItem) {
    return Item.fromDto(dto);
  }
  protected fromListDto(dto: ItemList) {
    return Item.fromListDto(dto);
  }
  protected toDto(entity: Item) {
    return Item.toDto(entity);
  }
}
