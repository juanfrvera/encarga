import { Injectable } from '@angular/core';
import { Util } from '../util';
import { ItemDto } from '../data/item/item.dto';
import { LineaPedido } from '../data/pedido/linea-pedido';
import { Pedido } from '../data/pedido/pedido';
import { PedidoDto } from '../data/pedido/pedido.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { ItemFilter } from '../data/item/item-filter';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private static readonly storageKey = 'pedidos';
  private urlComercio = new BehaviorSubject<string | null>(null);
  private urlComercioObs: Observable<string | null>;

  /** Url del comercio actual */
  public get UrlComercio() {
    return this.urlComercio.value;
  }

  public set UrlComercio(url: string | null) {
    this.urlComercio.next(url);
  }

  public get UrlComercioObservable() {
    if (!this.urlComercioObs) {
      this.urlComercioObs = this.urlComercio.asObservable();
    }

    return this.urlComercioObs;
  }

  constructor(private itemService: ItemService) { }

  public hayPedido() {
    return this.get()?.HayItems ?? false;
  }

  /** Agrega un item al carrito y guarda cambios en el local storage */
  public add(item: ItemDto) {
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
  public remove(item: ItemDto) {
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
    const listaDtos = this.getListaPedidos();

    const dto = listaDtos.find(p => p.urlComercio == this.UrlComercio);

    if (dto) {
      // Convertir a clase para poder usar funciones y propiedades
      return Pedido.fromDto(dto);
    }
    else {
      // Crear una nueva instancia
      return new Pedido([], this.UrlComercio);
    }
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
  private getListaPedidos() {
    const pedidosJson = localStorage.getItem(PedidoService.storageKey);

    // El Json obtenido es de una lista de dtos serializables
    return (pedidosJson ? JSON.parse(pedidosJson) : []) as PedidoDto[];
  }

  /** Guarda cambios en el localStorage */
  private save(pedido: Pedido) {
    const dto = Pedido.toDto(pedido);

    const listaDtosGuardados = this.getListaPedidos();

    // Buscar si hay un pedido guardado con la misma urlComercio
    const index = listaDtosGuardados.findIndex(p => p.urlComercio == dto.urlComercio);

    if (index >= 0) {
      // Si se encontró, reemplazar el viejo
      listaDtosGuardados[index] = dto;
    }
    else {
      // Si no se encontró agregarlo
      listaDtosGuardados.push(dto);
    }

    // Se guarda el dto porque es serializable
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(listaDtosGuardados));
  }
}
