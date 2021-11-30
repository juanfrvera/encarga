import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { FormularioComponent } from '../../../shared/component/formulario/formulario.component';
import { Util } from '../../../util';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemData } from '../../data/item.data';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;

  private itemDataList?: Array<ItemData>;

  /** Datos de formulario */
  public model: {
    nombre?: string,
    entrega?: string,
    direccion?: string,
    comentarios?: string,
    telPrueba?: string
  } = { nombre: '', entrega: 'Envio a domicilio', direccion: '', comentarios: '', telPrueba: '' };

  public finished = false;
  public total = 0;

  public get ItemDataList() {
    return this.itemDataList;
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly itemService: ItemService,
    private readonly pedidoService: PedidoService
  ) { }

  ngOnInit() {
    const pedido = this.pedidoService.get();

    if (pedido && pedido.HasItems) {
      // Obtiene los id de los items
      const itemIds = pedido.lines?.map(lp => lp.itemId);
      // Pedir items para esos ids y guardarlos con su cantidad
      this.itemService.getListByIdList(itemIds).subscribe(itemList => {
        this.itemDataList = itemList.map(item => {
          // Linea correspondiente a este item mapeado
          const pedidoLine = pedido.lines.find(linea => linea.itemId === item.id) ?? { count: 0 };

          // Aprovecho para calcular el total
          if (item.price) {
            this.total += item.price * pedidoLine.count;
          }

          // Convierte un item a item con cantidad
          // Descomponiendo las propiedades de item y agregandole cantidad
          return {
            id: item.id,
            count: pedidoLine.count,
            name: item.name,
            price: item.price
          };
        });
      });
    }
    else {
      // La lista vacía significa que el carrito está vacío y muestra el #emptyState
      this.itemDataList = [];
    }
  }

  /** Agrega un item al carrito */
  public addItem(item: ItemData) {
    item.count++;
    this.pedidoService.add(item.id);

    this.total += item.price ?? 0;
  }

  /** Quita un item al carrito */
  public removeItem(item: ItemData) {
    item.count--;
    this.pedidoService.remove(item.id);

    this.total -= item.price ?? 0;

    if (item.count <= 0 && this.itemDataList) {
      Util.deleteElement(this.itemDataList, item);
    }
  }

  /** Limpia el carrito */
  public clean() {
    this.pedidoService.deleteAllLines();
    this.itemDataList = [];
  }

  public clickGoBack() {
    // Ir hacia la ruta padre
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /** Chequea que el formulario de info de entrega este correcto y envia el arma el mensaje de whatsapp */
  public clickFinish() {
    this.finished = true;

    /** Datos del formulario */
    const d = this.model;
    // Chequea si el form es valido
    if (this.formulario.isValid() && (d.entrega !== 'Envio a domicilio' || d.direccion) && this.itemDataList) {
      console.log('ok');
      // Agrega al cuerpo del mensaje a enviar info de la entrega
      let cuerpo = `*DETALLE DE ENTREGA*\nNombre y Apellido:\n_${d.nombre}_\nForma de entrega:\n_${d.entrega}${d.entrega == 'Envio a domicilio' ? ' / ' + d.direccion : ''}_\nComentarios:\n_${d.comentarios}_\n\n*DETALLE DE PEDIDO*\n`;

      // Agrega al cuerpo los items del pedido con su cantidad y subtotal
      for (const e of this.itemDataList) {
        cuerpo += `_${e.count} X ${e.name} : $${e.count * (e.price ?? 0)}_\n`;
      }
      // Agrega al cuerpo el total
      cuerpo += `\n*TOTAL*\n$${this.total}`;

      const url = `https://wa.me/${d.telPrueba}/?text=` + encodeURI(cuerpo);
      window.open(url, '_blank');
    }
    else {
      console.log('invalid');
      this.formulario.showFeedback();
    }
  }
}
