import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../service/pedido.service';
import { ItemService } from '../../../service/item.service';;
import { Location } from '@angular/common';
import { ItemConCantidad } from '../../../data/item/item-con-cantidad';
import { FormularioComponent } from '../../../component/formulario/formulario.component';
import { Util } from '../../../util';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;

  private itemsConCantidad?: ItemConCantidad[];

  /** Datos de formulario */
  public datos: { nombre?: string, entrega?: string, direccion?: string, comentarios?: string, telPrueba?: string } =
    { nombre: '', entrega: 'Envio a domicilio', direccion: '', comentarios: '', telPrueba: '' };
  public finalizado = false;
  public total = 0;

  public get ItemsConCantidad() {
    return this.itemsConCantidad;
  }


  constructor(
    private pedidoService: PedidoService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    const pedido = this.pedidoService.get();

    if (pedido && pedido.HayItems) {
      // Obtiene los id de los items
      const itemIds = pedido.lineas?.map(lp => lp.idItem);
      // Pedir items para esos ids y guardarlos con su cantidad
      this.itemService.getByIds(itemIds).subscribe(items => {
        this.itemsConCantidad = items.map(item => {
          // Linea correspondiente a este item mapeado
          const lineaPedido = pedido.lineas.find(linea => linea.idItem === item.id) ?? { cantidad: 0 };

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
    }
    else {
      // La lista vacía significa que el carrito está vacío y muestra el #emptyState
      this.itemsConCantidad = [];
    }
  }

  /** Agrega un item al carrito */
  public agregarItem(item: ItemConCantidad) {
    item.cantidad++;
    this.pedidoService.add(item);

    this.total += item.precio ?? 0;
  }

  /** Quita un item al carrito */
  public quitarItem(item: ItemConCantidad) {
    item.cantidad--;
    this.pedidoService.remove(item);

    this.total -= item.precio ?? 0;

    if (item.cantidad <= 0 && this.itemsConCantidad) {
      Util.eliminarItem(this.itemsConCantidad, item);
    }
  }

  /** Limpia el carrito */
  public limpiar() {
    this.pedidoService.eliminarTodasLineas();
    this.itemsConCantidad = [];
  }

  /** Vuelve a la pagina anterior */
  public clickVolver() {
    this.location.back();
  }

  /** Chequea que el formulario de info de entrega este correcto y envia el arma el mensaje de whatsapp */
  public clickFinalizar() {
    this.finalizado = true;

    /** Datos del formulario */
    const d = this.datos;
    // Chequea si el form es valido
    if (this.formulario.esValido() && (d.entrega !== 'Envio a domicilio' || d.direccion) && this.itemsConCantidad) {
      console.log('ok');
      // Agrega al cuerpo del mensaje a enviar info de la entrega
      let cuerpo = `*DETALLE DE ENTREGA*\nNombre y Apellido:\n_${d.nombre}_\nForma de entrega:\n_${d.entrega} / ${d.direccion}_\nComentarios:\n_${d.comentarios}_\n\n*DETALLE DE PEDIDO*\n`;

      // Agrega al cuerpo los items del pedido con su cantidad y subtotal
      for (const e of this.itemsConCantidad) {
        cuerpo += `_${e.cantidad} X ${e.titulo} : $${e.cantidad * (e.precio ?? 0)}_\n`;
      }
      // Agrega al cuerpo el total
      cuerpo += `\n*TOTAL*\n$${this.total}`;

      // Crea el link de whatsapp con el telefono y cuerpo a enviar 
      const a = document.createElement('a');
      a.href = `https://wa.me/549${d.telPrueba}/?text=` + encodeURI(cuerpo);
      a.target = '_blank';
      a.click();

    }
    else {
      console.log('invalid');
      this.formulario.mostrarFeedback();
    }
  }
}
