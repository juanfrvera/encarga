import { Injectable } from '@angular/core';
import { Util } from '../util';
import { IItem } from '../data/item/item.dto';
import { LineaPedido } from '../data/pedido/linea-pedido';
import { Pedido } from '../data/pedido/pedido';
import { PedidoDto } from '../data/pedido/pedido.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriaService } from './categoria.service';
import { ItemService } from './item.service';
import { ItemFilter } from '../data/item/item-filter';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private static readonly storageKey = 'pedido';
  private urlComercio = new BehaviorSubject<string | null>(null);
  private urlComercioObs: Observable<string | null>;

  public get ListaCategorias() {
    return this.categoriaService.Lista;
  }

  /** Url del comercio actual */
  public get UrlComercio() {
    if (!this.urlComercioObs) {
      this.urlComercioObs = this.urlComercio.asObservable();
    }

    return this.urlComercioObs;
  }

  constructor(private categoriaService: CategoriaService, private itemService: ItemService) { }

  public hayPedido() {
    return this.get()?.HayItems ?? false;
  }

  /** Agrega un item al carrito y guarda cambios en el local storage */
  public add(item: IItem) {
    const pedido = this.get();

    // Si no hay array de lineas, se pondrá en null
    const lineaPedido = pedido.lineas?.find(p => p.idItem === item.id);

    if (!lineaPedido) {
      // Inicializar array si este no existe
      if (!pedido.lineas) {
        pedido.lineas = [];
      }
      // Add item
      pedido.lineas.push({ idItem: item.id, cantidad: 1 });
    }
    else {
      lineaPedido.cantidad++;
    }

    this.save(pedido);
  }

  /** Quita un item del carrito y guarda cambios en el local storage */
  public remove(item: IItem) {
    const pedido = this.get();

    const lineaPedido = pedido.lineas?.find(p => p.idItem === item.id);

    if (lineaPedido) {
      if (lineaPedido.cantidad === 1) {
        // Remove item
        Util.eliminarItem(pedido.lineas, lineaPedido);
      }
      else {
        lineaPedido.cantidad--;
      }

      this.save(pedido);
    }
    else {
      throw "No se encontró la línea a remover";
    }
  }

  /** Quita un item con sus cantidades del carrito y guarda cambios en el local storage */
  public eliminarLinea(linea: LineaPedido) {
    const pedido = this.get();
    // Se busca por id ya que el objeto pasado puede ser diferente al objeto traido del localstorage
    const indice = pedido.lineas.findIndex(l => l.idItem === linea.idItem);
    Util.eliminarEn(pedido.lineas, indice);

    this.save(pedido);
  }

  /** Elimina todos los items con sus cantidades y guarda cambios en el local storage */
  public eliminarTodasLineas() {
    const pedido = this.get();

    pedido.lineas = [];

    this.save(pedido);
  }

  public get() {
    const pedidoJson = localStorage.getItem(PedidoService.storageKey);

    // El Json obtenido es de un dto ya que este es serializable
    const dto = pedidoJson ? JSON.parse(pedidoJson) as PedidoDto : {} as PedidoDto;

    // Convertir a clase para poder usar funciones y propiedades
    return Pedido.fromDto(dto);
  }

  public setUrlComercio(url: string | null) {
    this.urlComercio.next(url);
  }

  // --------------- Categorias -----------


  // -------------- ITEMS -----------------
  getItemsByIds(ids: string[]) {
    return this.itemService.getByIds(ids);
  }
  getItemsWithFilter(filter: ItemFilter) {
    return this.itemService.getWithFilter(filter);
  }


  // ------------- PRIVADOS --------------

  /** Guarda cambios en el localStorage */
  private save(pedido: Pedido) {
    const dto = Pedido.toDto(pedido);

    // Se guarda el dto porque es serializable
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(dto));
  }
}
