import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { ItemService } from 'src/app/service/item.service';;
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  public itemsConCantidad;
  public total = this.pedidoService.total;
  public envio: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    const pedidos = this.pedidoService.get();
    const itemIds = pedidos.map(lp => lp.idItem);
    this.itemsConCantidad = this.itemService.getItems(itemIds).map(item => {
      return {
        titulo: item.title,
        cantidad: pedidos.find(pedido => pedido.idItem == item.id).cantidad,
        precio: item.price
      }
    });
  }

  public clickEnvio() {
    this.envio = true;
  }

  public clickRetiro() {
    this.envio = false;
  }

  public clickVolver() {
    this.location.back();
  }
}
