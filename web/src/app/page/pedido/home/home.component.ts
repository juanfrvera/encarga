import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../service/pedido.service';
import { ItemService } from '../../../service/item.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'bootstrap';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Item } from 'src/app/data/item/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('accordion', { static: true }) accordionElement: ElementRef;
  @ViewChild('toast', { static: true }) toastElement: ElementRef;

  private toast: Toast;

  /** Categoría actual en accordion */
  private categoriaActual?: number;

  private cantidades: { idItem: string, cantidad: number }[];
  private total = 0;

  public get CategoriaActual() {
    return this.categoriaActual;
  }

  public get Categorias() {
    return this.categoriaService.Lista;
  }
  public get Total() {
    return this.total;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private pedidoService: PedidoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.toast = new Toast(this.toastElement.nativeElement, { autohide: false });

    if (this.pedidoService.hayPedido()) {
      this.reflejarPedido();
    }
  }

  ngOnDestroy() {
    this.ocultarToast();
  }

  // Cuando una categoría será mostrada (todavía no se hizo la animación de abrir accordion)
  categoriaWillShow(index: number) {
    this.categoriaActual = index;
  }

  // Cuando una categoría fue ocultada (la animación de ocultar accordion ya terminó)
  categoriaHidden(index: number) {
  }


  private crearObjetoCantidad(item: Item, cantidad: number = 0) {
    const objetoCantidad = { idItem: item.id, cantidad: cantidad };

    // Inicializar lista en caso de que no se haya hecho antes
    if (!this.cantidades) {
      this.cantidades = [];
    }

    this.cantidades.push(objetoCantidad);

    return objetoCantidad;
  }

  public objetoCantidadDe(item: Item) {
    return this.cantidades?.find(c => c.idItem == item.id);
  }

  public cantidadDe(item: Item) {
    return this.objetoCantidadDe(item)?.cantidad ?? 0;
  }

  /** Agrega el producto al pedido, sumandolo al total */
  public agregarItem(item: Item) {
    const objetoCantidad: { idItem: string, cantidad: number } =
      this.objetoCantidadDe(item) ??
      this.crearObjetoCantidad(item);

    objetoCantidad.cantidad++;

    this.total += item.precio ?? 0;
    this.mostrarToast();

    this.pedidoService.add(item);
  }

  /** Quita el producto al pedido, restandolo del total */
  public quitarItem(item: Item) {
    const objetoCantidad = this.objetoCantidadDe(item);
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (!objetoCantidad || objetoCantidad.cantidad <= 0) return;

    objetoCantidad.cantidad--;

    // Resta el producto del total
    this.total -= item.precio ?? 0;

    // Si el total esta en 0, no muestra ningun toast con total
    // tslint:disable-next-line: triple-equals
    if (!this.hayPedido()) {
      this.ocultarToast();
    }
    // Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.mostrarToast();
    }

    this.pedidoService.remove(item);
  }

  /** Limpia el carrito */
  public limpiar() {
    this.pedidoService.eliminarTodasLineas();
    this.reflejarPedido();
    this.ocultarToast();
  }

  /** Continua a la pagina de detalle */
  public continuar() {
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  /** Devuelve true si el total es mayor que 0 */
  private hayPedido() {
    return this.total > 0;
  }

  /** Muestra el toast */
  private mostrarToast() {
    this.toast.show();
  }

  /** Oculta el toast */
  private ocultarToast() {
    this.toast.hide();
  }

  /** Carga las cantidades pedidas a los items con cantidad y calcula la variable total */
  private reflejarPedido() {
    this.total = 0;

    const pedido = this.pedidoService.get();

    const idsItems = pedido.lineas.map(l => l.idItem);
    this.itemService.getWithFilter({ ids: idsItems }).subscribe(items => {
      pedido.lineas.forEach(linea => {
        // Buscar el item correspondiente a la linea y asignarle la cantidad pedida
        const item = items.find(i => i.id === linea.idItem);
        // El item puede haber sido eliminado de la base de datos mientras estaba guardado en el pedido de un cliente
        // Este chequeo es para que no haya un error de referencia
        if (item) {
          const cantidad = linea.cantidad;
          this.crearObjetoCantidad(item, cantidad);

          if (item.precio) {
            this.total += item.precio * cantidad;
          }
        }
        else {
          // Como el item guardado no existe mas, eliminar la linea del pedido
          this.pedidoService.eliminarLinea(linea);
          console.log('Se eliminó el item \'' + linea.idItem + '\' porque ya no existe en el catálogo');
        }
      });

      this.mostrarToast();
    });
  }
}
