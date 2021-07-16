import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Item } from '../data/item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly api: ApiService<Item>;

  private items: BehaviorSubject<Item[]> = new BehaviorSubject(null);
  private readonly itemsObservable = this.items.asObservable();

  public get Items(): Observable<Item[]> {
    // La primera vez, items va a ser null
    if (!this.items.getValue()) {
      // Cargar una lista vacía momentaneamente para que no fallen los suscriptores que esperen una lista
      this.items.next([]);
      // Mientras tanto, consultar al servidor los items reales, cuando estos vengan, avisarle a los suscriptores
      this.getAll().subscribe(items => this.items.next(items));
    }

    // Se devuelve este que será compartido por todos
    return this.itemsObservable;
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
    // Crear en server y guardar la instancia del observable
    const obs = this.api.create(itemSinId);

    obs.subscribe((itemServer) => {
      // Obtener lista actual, si es null hacer una lista vacía
      const lista = this.items.getValue() ?? [];
      // Agregar elemento al principio de la lista
      lista.unshift(itemServer);

      // Informar nueva lista a los suscriptores
      this.items.next(lista);
    }, error => {
      console.error(error);
    });

    // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
    return obs;
  }

  /** Edita un item */
  public edit(item: Item) {
    // Actualizar en server y guardar la instancia del observable
    const obs = this.api.updateById(item.id, item);

    obs.subscribe(() => {
      // Obtener lista actual
      const lista = this.items.getValue();

      // Actualizar localmente el elemento
      const index = lista.findIndex(i => i.id === item.id);
      lista[index] = item;

      this.items.next(lista);
    }, error => {
      console.error(error);
    });

    // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
    return obs;
  }

  /** Elimina un item */
  public delete(item: Item) {
    // Eliminar en server y guardar la instancia del observable
    const obs = this.api.deleteById(item.id);

    obs.subscribe(() => {
      const lista = this.items.getValue();

      // Eliminar elemento localmente
      const index = lista.findIndex(i => i.id === item.id);
      lista.splice(index, 1);

      // Informar nueva lista a los suscriptores
      this.items.next(lista);
    }, error => {
      console.error(error);
    });

    // Devolver observable para que donde se use se pueda esperar y reaccionar ante el server
    return obs;
  }

  private getAll() {
    return this.api.getAll();
  }
}
