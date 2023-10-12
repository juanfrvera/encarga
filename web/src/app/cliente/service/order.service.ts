import { Injectable } from '@angular/core';
import { Util } from '../../util';
import { OrderLine } from '../data/order/order-line';
import { Order } from '../data/order/order.data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OrderService {
  private readonly storageKey = 'orders';
  private shopPath = new BehaviorSubject<string | null>(null);
  private shopPathObs: Observable<string | null>;

  /** Url del comercio actual */
  public get ShopPath() {
    return this.shopPath.value;
  }

  public set ShopPath(url: string | null) {
    this.shopPath.next(url);
  }

  public get ShopPathObservable() {
    if (!this.shopPathObs) {
      this.shopPathObs = this.shopPath.asObservable();
    }

    return this.shopPathObs;
  }

  constructor(
  ) { }

  public hasOrder() {
    const order = this.getOrder();
    return order.lines ? true : false
  }

  /** Agrega un item al carrito y guarda cambios en el local storage */
  public add(itemId: string) {
    const order = this.getOrder();

    // Si no hay array de lineas, se pondrá en null
    const orderLine = order.lines?.find(l => l.itemId === itemId);

    if (!orderLine) {
      // Inicializar array si este no existe
      if (!order.lines) {
        order.lines = [];
      }
      // Add item
      order.lines.push({ itemId, count: 1 });
    }
    else {
      orderLine.count++;
    }

    this.save(order);
  }

  public getItemCount(itemId: string): number {
    const order = this.getOrder();

    // Si no hay array de lineas, se pondrá en null
    const orderLine = order.lines?.find(p => p.itemId === itemId);

    if (orderLine) {
      return orderLine.count;
    }

    return 0;
  }

  /** Quita un item del carrito y guarda cambios en el local storage */
  public remove(itemId: string) {
    const order = this.getOrder();

    const orderLine = order.lines?.find(p => p.itemId == itemId);

    if (orderLine) {
      if (orderLine.count === 1) {
        // Remove item
        Util.deleteElement(order.lines!, orderLine);
      }
      else {
        orderLine.count--;
      }

      this.save(order);
    }
    else {
      throw "No se encontró la línea a remover";
    }
  }

  /** Quita un item con sus cantidades del carrito y guarda cambios en el local storage */
  public deleteLine(line: OrderLine) {
    const order = this.getOrder();
    // Se busca por id ya que el objeto pasado puede ser diferente al objeto traido del localstorage
    if(order.lines) {
      const index = order.lines.findIndex(l => l.itemId === line.itemId);
      Util.deleteAt(order.lines, index);
    }  
    this.save(order);
  }

  /** Elimina todos los items con sus cantidades y guarda cambios en el local storage */
  public deleteAllLines() {
    const order = this.getOrder();

    order.lines = [];

    this.save(order);
  }

  public getOrder() {
    const orderList = this.getOrderList();

    const currentOrder = orderList.find(o => o.shopPath == this.ShopPath);

    if (currentOrder) {
      return currentOrder;
    }
    else {
      return { lines: undefined, shopPath: this.ShopPath } as Order
    }
  }

  // ------------- PRIVADOS --------------
  private getOrderList() {
    const jsonOrder = localStorage.getItem(this.storageKey);

    return (jsonOrder ? JSON.parse(jsonOrder) : []) as Order[];
  }

  /** Guarda cambios en el localStorage */
  private save(order: Order) {
    const orderList = this.getOrderList();

    // Buscar si hay un pedido guardado con la misma urlComercio
    const index = orderList.findIndex(o => o.shopPath == order.shopPath);

    if (index >= 0) {
      // Si se encontró, reemplazar el viejo
      orderList[index] = order;
    }
    else {
      // Si no se encontró agregarlo
      orderList.push(order);
    }

    // Se guarda el dto porque es serializable
    localStorage.setItem(this.storageKey, JSON.stringify(orderList));
  }
}
