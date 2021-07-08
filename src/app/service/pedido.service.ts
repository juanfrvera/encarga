import { Injectable } from '@angular/core';
import { Item } from '../data/item';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private static readonly storageKey = "pedidos";

  constructor() { }

  public add(item: Item) {
    // Get from localstorage
    const pedidosJson = localStorage.getItem(PedidoService.storageKey);
    const pedidos = pedidosJson ? JSON.parse(pedidosJson) as Item[] : [];

    // Add item
    pedidos.push(item);

    // Save to localstorage
    localStorage.setItem(PedidoService.storageKey, JSON.stringify(pedidos));
  }

  public remove(item : Item){
    
  }
}
