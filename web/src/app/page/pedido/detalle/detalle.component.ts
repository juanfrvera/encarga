import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../service/pedido.service';
import { ItemService } from '../../../service/item.service';;
import { Location } from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ItemConCantidad } from '../../../data/item-con-cantidad';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  public finalizado = false;
  public form: FormGroup;
  public itemsConCantidad: ItemConCantidad[];
  public total = 0;


  constructor(
    private pedidoService: PedidoService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    const pedido = this.pedidoService.get();
    // Obtiene los id de los items
    const itemIds = pedido.lineas?.map(lp => lp.idItem);
    // Pedir items para esos ids y guardarlos con su cantidad
    this.itemService.getItemsByIds(itemIds).subscribe(items => {
      this.itemsConCantidad = items.map(item => {
        // Linea correspondiente a este item mapeado
        const lineaPedido = pedido.lineas.find(linea => linea.idItem === item.id);

        // Aprovecho para calcular el total
        if (item.precio) {
          this.total += item.precio * lineaPedido.cantidad;
        }

        // Convierte un item a item con cantidad
        // Descomponiendo las propiedades de item y agregandole cantidad
        return {
          ...item,
          cantidad: lineaPedido.cantidad,
        };
      });
    });

    // Formulario de informacion de entrega
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      entrega: new FormControl('Envio a domicilio', Validators.required),
      direccion: new FormControl(''),
      comentarios: new FormControl(''),
      telPrueba: new FormControl('', Validators.required)
    });
  }

  public agregarItem(item) {
    console.log("No implementado aún");
  }

  public quitarItem(item) {
    console.log("No implementado aún");
  }

  /** Vuelve a la pagina anterior */
  public clickVolver() {
    this.location.back();
  }

  /** Chequea que el formulario de info de entrega este correcto y envia el arma el mensaje de whatsapp */
  public clickFinalizar(telPrueba: number) {
    console.log(telPrueba);
    this.finalizado = true;
    // Valores del form
    const u = this.form.value;
    // Chequea si el form es valido
    if (this.form.valid && (u.entrega !== 'Envio a domicilio' || u.direccion)) {

      console.log('ok');
      // Agrega al cuerpo del mensaje a enviar info de la entrega
      let cuerpo = `*DETALLE DE ENTREGA*\nNombre y Apellido:\n_${u.nombre}_\nForma de entrega:\n_${u.entrega} / ${u.direccion}_\nComentarios:\n_${u.comentarios}_\n\n*DETALLE DE PEDIDO*\n`;

      // Agrega al cuerpo los items del pedido con su cantidad y subtotal
      for (const e of this.itemsConCantidad) {
        cuerpo += `_${e.cantidad} X ${e.titulo} : $${e.cantidad * e.precio}_\n`;
      }
      // Agrega al cuerpo el total
      cuerpo += `\n*TOTAL*\n$${this.total}`;

      // Crea el link de whatsapp con el telefono y cuerpo a enviar
      const a = document.createElement('a');
      a.href = `https://wa.me/549${telPrueba}/?text=` + encodeURI(cuerpo);
      a.target = '_blank';
      a.click();

    }
    else {
      console.log('invalid');
      return false;
    }
  }

  /** Obtiene los errores */
  public get errorControl() {
    return this.form.controls;
  }
}
