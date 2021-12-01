import { Injectable } from '@angular/core';
import { Util } from '../../util';
import { LineaPedido } from '../data/pedido/linea-pedido';
import { Pedido } from '../data/pedido/pedido';
import { PedidoDto } from '../data/pedido/pedido.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';

@Injectable()
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

  constructor(
  ) { }

  public hayPedido() {
    return this.get()?.HasItems ?? false;
  }

  /** Agrega un item al carrito y guarda cambios en el local storage */
  public add(itemId: string) {
    const pedido = this.get();

    // Si no hay array de lineas, se pondrá en null
    const lineaPedido = pedido.lines?.find(p => p.itemId === itemId);

    if (!lineaPedido) {
      // Inicializar array si este no existe
      if (!pedido.lines) {
        pedido.lines = [];
      }
      // Add item
      pedido.lines.push({ itemId, count: 1 });
    }
    else {
      lineaPedido.count++;
    }

    this.save(pedido);
  }

  public getItemCount(itemId: string): number {
    const pedido = this.get();

    // Si no hay array de lineas, se pondrá en null
    const lineaPedido = pedido.lines?.find(p => p.itemId === itemId);

    if (lineaPedido) {
      return lineaPedido.count;
    }

    return 0;
  }

  /** Quita un item del carrito y guarda cambios en el local storage */
  public remove(itemId: string) {
    const pedido = this.get();

    const lineaPedido = pedido.lines?.find(p => p.itemId == itemId);

    if (lineaPedido) {
      if (lineaPedido.count === 1) {
        // Remove item
        Util.deleteElement(pedido.lines, lineaPedido);
      }
      else {
        lineaPedido.count--;
      }

      this.save(pedido);
    }
    else {
      throw "No se encontró la línea a remover";
    }
  }

  /** Quita un item con sus cantidades del carrito y guarda cambios en el local storage */
  public deleteLine(line: LineaPedido) {
    const pedido = this.get();
    // Se busca por id ya que el objeto pasado puede ser diferente al objeto traido del localstorage
    const indice = pedido.lines.findIndex(l => l.itemId === line.itemId);
    Util.deleteAt(pedido.lines, indice);

    this.save(pedido);
  }

  /** Elimina todos los items con sus cantidades y guarda cambios en el local storage */
  public deleteAllLines() {
    const pedido = this.get();

    pedido.lines = [];

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
