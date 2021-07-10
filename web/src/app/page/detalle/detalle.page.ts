import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { ItemService } from 'src/app/service/item.service';;
import { Location } from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  public finalizado: boolean = false;
  public form: FormGroup;
  public itemsConCantidad;
  public total = this.pedidoService.total;
  public user: {
    nombre: string,
    entrega: string,
    direccion?: string
  } = { nombre: "", entrega: "envio" };
  

  constructor(
    private pedidoService: PedidoService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    const pedidos = this.pedidoService.get();
    //Obtiene los id de los items
    const itemIds = pedidos.map(lp => lp.idItem);
    //Guarda los items con su cantidad
    this.itemsConCantidad = this.itemService.getItems(itemIds).map(item => {
      return {
        titulo: item.title,
        cantidad: pedidos.find(pedido => pedido.idItem == item.id).cantidad,
        precio: item.price
      }
    });

    //Formulario de informacion de entrega
    this.form = new FormGroup({
      nombre: new FormControl(this.user.nombre, Validators.required),
      entrega: new FormControl(this.user.entrega, Validators.required),
      direccion: new FormControl(this.user.direccion, Validators.required)
    });
  }

  /**Vuelve a la pagina anterior */
  public clickVolver() {
    this.location.back();
  }

  /**Chequea que el formulario de info de entrega este correcto y envia el arma el mensaje de whatsapp */
  public clickFinalizar() {
    this.finalizado = true;
    if (this.form.valid) {
      console.log("ok"); //TODO: armar mensaje de whatsapp
    }
    else {
      console.log("invalid");
      return false

    }
  }

  /**Obtiene los errores */
  public get errorControl() {
    return this.form.controls;
  }

}
