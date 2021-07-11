import { Injectable } from '@angular/core';
import { Util } from 'src/util';
import { Item } from '../data/item';
import { Pedido } from '../data/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private static readonly storageKey = 'pedido';
  public total = 0;

  constructor() { }

  public get() {
    const pedidoJson = localStorage.getItem(PedidoService.storageKey);
    const pedido = pedidoJson ? JSON.parse(pedidoJson) as Pedido : {} as Pedido;
    return pedido;
  }

  public add(item: Item) {
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

  public remove(item: Item) {
    const pedido = this.get();

    const lineaPedido = pedido.lineas?.find(p => p.idItem === item.id);

    if (lineaPedido.cantidad === 1) {
      // Remove item
      Util.eliminarItem(pedido.lineas, lineaPedido);
    }
    else {
      lineaPedido.cantidad--;
    }

    this.save(pedido);
  }

  /** Save to localStorage */
  private save(pedido: Pedido) {
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(pedido));
  }
}
