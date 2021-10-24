import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemDto } from '../data/item/item.dto';
import { ItemFilter } from '../data/item/item-filter';
import { CrudService } from './instance/crud.service';
import { Item } from '../data/item/item';
import { Util } from '../util';
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

  public edit(entity: Item) {
    // Valor viejo del item (sin edicion)
    // Se hace una copia profunda para mantener los datos viejos aunque se edite
    const viejo = Util.copiaProfunda(this.lista.value?.find(i => i.id == entity.id));

    return super.edit(entity).pipe(
      tap(itemEnServer => {
        this.onItemUpdate.next({ nuevo: itemEnServer, viejo: viejo });
      })
    );
  }

  public delete(itemId: string) {
    const lista = this.lista.value;
    const itemEliminado = lista ? Util.copiaProfunda(lista.find(i => i.id == itemId)) : undefined;
    return super.delete(itemId).pipe(
      // Informar que se eliminó el item a los suscriptores
      // usar el original y sino existe, usar el pasado como parametro
      tap(() => this.onItemDeleted.next(itemEliminado))
    );
  }

  protected fromDto(dto: ItemDto) {
    return {
      id: dto.id,
      titulo: dto.titulo,
      precio: dto.precio,
      descripcion: dto.descripcion,
      idsCategorias: dto.idsCategorias
    } as Item;
  }
  protected fromListDto(dto: ItemListDto) {
    return { id: dto.id, titulo: dto.titulo, precio: dto.precio, descripcion: dto.descripcion } as Item;
  }
  protected toDto(entity: Item) {
    return {
      id: entity.id,
      titulo: entity.titulo,
      precio: entity.precio,
      descripcion: entity.descripcion,
      idsCategorias: entity.idsCategorias
    } as ItemDto;
  }
}
