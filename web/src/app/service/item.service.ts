import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemDto } from '../data/item/item.dto';
import { ItemFilter } from '../data/item/item-filter';
import { CrudService } from './instance/crud.service';
import { Item } from '../data/item/item';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemListDto } from '../data/item/item-list.dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends CrudService<Item, ItemDto, ItemListDto, ItemFilter>{
  private onItemCreated = new Subject<Item>();
  private onItemCreatedObservable?: Observable<Item>;
  public get OnItemCreated() {
    if (!this.onItemCreatedObservable) {
      this.onItemCreatedObservable = this.onItemCreated.asObservable();
    }
    return this.onItemCreatedObservable;
  }

  private onItemUpdate = new Subject<{ nuevo: Item, viejo?: Item }>();
  private onItemUpdateObservable?: Observable<{ nuevo: Item, viejo?: Item }>;
  public get OnItemUpdate() {
    if (!this.onItemUpdateObservable) {
      this.onItemUpdateObservable = this.onItemUpdate.asObservable();
    }
    return this.onItemUpdateObservable;
  }

  private onItemDeleted = new Subject<Item>();
  private onItemDeletedObservable?: Observable<Item>;
  public get OnItemDeleted() {
    if (!this.onItemDeletedObservable) {
      this.onItemDeletedObservable = this.onItemDeleted.asObservable();
    }
    return this.onItemDeletedObservable;
  }

  constructor(readonly http: HttpClient) {
    super(http, 'items/');
  }

  public create(entity: Item) {
    return super.create(entity).pipe(
      tap(itemServer => {
        // Informar que un item fue creado
        this.onItemCreated.next(itemServer);
      })
    );
  }
}
