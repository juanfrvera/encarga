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
      nombre: new FormControl('', Validators.required),
      entrega: new FormControl('Envio a domicilio', Validators.required),
      direccion: new FormControl(''),
      comentarios: new FormControl('')
    });
  }

  /**Vuelve a la pagina anterior */
  public clickVolver() {
    this.location.back();
  }

  /**Chequea que el formulario de info de entrega este correcto y envia el arma el mensaje de whatsapp */
  public clickFinalizar() {
    this.finalizado = true;
    //Valores del form
    const u = this.form.value;
    //Chequea si el form es valido
    if (this.form.valid && (u.entrega != "Envio a domicilio" || u.direccion)) {

      console.log("ok");
      //Agrega al cuerpo del mensaje a enviar info de la entrega
      let cuerpo = `*DETALLE DE ENTREGA*\nNombre y Apellido:\n_${u.nombre}_\nForma de entrega:\n_${u.entrega} / ${u.direccion}_\nComentarios:\n_${u.comentarios}_\n\n*DETALLE DE PEDIDO*\n`;

      //Agrega al cuerpo los items del pedido con su cantidad y subtotal
      for (let i = 0; i < this.itemsConCantidad.length; i++) {
        const e = this.itemsConCantidad[i];
        cuerpo += `_${e.cantidad} X ${e.titulo} : $${e.cantidad * e.precio}_\n`

      }
      //Agrega al cuerpo el total
      cuerpo += `\n*TOTAL*\n$${this.total}`

      //Crea el link de whatsapp con el telefono y cuerpo a enviar
      let a = document.createElement('a');
      a.href = "https://wa.me/5493442568745/?text=" + encodeURI(cuerpo);
      a.target = "_blank"
      a.click();

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
