import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  public itemsConCantidad;
  public total = this.pedidoService.total;
  
  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService,
  ) { }

  ngOnInit() {
    const pedidos = this.pedidoService.get();
    const itemIds = pedidos.map(lp => lp.idItem);
    this.itemsConCantidad = this.productoService.getItems(itemIds).map(item => {
      return {
        titulo: item.title,
        cantidad: pedidos.find(pedido => pedido.idItem == item.id).cantidad,
        precio: item.price
      }
    });
  }

}