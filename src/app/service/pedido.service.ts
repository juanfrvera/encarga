import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { LineaPedido } from '../data/lineaPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private static readonly storageKey = "pedidos";
  public total: number = 0;

  constructor() { }
  
  public get() {
    const pedidosJson = localStorage.getItem(PedidoService.storageKey);
    const pedidos = pedidosJson ? JSON.parse(pedidosJson) as LineaPedido[] : []
    return pedidos;
  }

  public add(item: Item) {
    // Get from localstorage
    const pedidosJson = localStorage.getItem(PedidoService.storageKey);
    const pedidos = pedidosJson ? JSON.parse(pedidosJson) as LineaPedido[] : [];

    const lineaPedido = pedidos.find(p => p.idItem == item.id);

    if (!lineaPedido)
      // Add item
      pedidos.push({ idItem: item.id, cantidad: 1 });
    else
      lineaPedido.cantidad++;

    // Save to localstorage
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(pedidos));
  }

  public remove(item: Item) {
    // Get from localstorage
    const pedidosJson = localStorage.getItem(PedidoService.storageKey);
    const pedidos = pedidosJson ? JSON.parse(pedidosJson) as LineaPedido[] : [];

    const lineaPedido = pedidos.find(p => p.idItem == item.id);
    const indexLineaPedido = pedidos.indexOf(lineaPedido);

    if (lineaPedido.cantidad == 1)
      // Remove item
      pedidos.splice(indexLineaPedido, 1);
    else
      lineaPedido.cantidad--;

    // Save to localstorage
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(pedidos));
  }
}
