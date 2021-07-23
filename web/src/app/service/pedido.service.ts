import { Injectable } from '@angular/core';
import { Util } from '../util';
import { Item } from '../data/item';
import { LineaPedido } from '../data/linea-pedido';
import { Pedido } from '../data/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private static readonly storageKey = 'pedido';

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
    else{
      throw "No se encontró la línea a remover";
    }
  }

  public eliminarLinea(linea: LineaPedido) {
    const pedido = this.get();
    // Se busca por id ya que el objeto pasado puede ser diferente al objeto traido del localstorage
    const indice = pedido.lineas.findIndex(l => l.idItem === linea.idItem);
    Util.eliminarEn(pedido.lineas, indice);

    this.save(pedido);
  }

  public eliminarTodasLineas(){
    const pedido = this.get();

    pedido.lineas = [];

    this.save(pedido);
  }

  /** Save to localStorage */
  private save(pedido: Pedido) {
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(pedido));
  }
}
