import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../service/pedido.service';
import { ItemService } from '../../../service/item.service';
import { ItemConCantidad } from '../../../data/item/item-con-cantidad';
import { CategoriaConItemsConCantidad } from '../../../data/categoria/categoria-con-items';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('toast', { static: true }) toastElement: ElementRef;
  private toast: Toast;

  private categorias: CategoriaConItemsConCantidad[] = [];
  private total = 0;

  public get Categorias() {
    return this.categorias;
  }
  
  public get Total() {
    return this.total;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.toast = new Toast(this.toastElement.nativeElement, { autohide: false });

    this.itemService.Lista.subscribe(items => {
      if (items) {
        // TODO: cambiar este código temporal
        // Código temporal hasta que tengamos categorias
        const categoria: CategoriaConItemsConCantidad = { id: '0', nombre: 'Todos', items: [] };

        categoria.items = items.map(item => {
          // Convierte un item a item con cantidad
          // Descomponiendo las propiedades de item y agregandole cantidad
          return { ...item, cantidad: 0 };
        });

        this.categorias = [categoria];

        // Esta suscripción es llamada al iniciar y puede no tener items del server aún (vacía por defecto)
        if (items.length) {
          this.reflejarPedido();
        }

        // Solo mostrar el total cuando hay pedido y estamos en home
        if (this.hayPedido() && this.router.url == '/pedido') {
          this.mostrarToast();
        }
      }
    }, error => {
      console.error(error);
    });

    if (this.hayPedido()) {
      this.mostrarToast();
    }
  }

  ngOnDestroy() {
    this.ocultarToast();
  }

  /** Agrega el producto al pedido, sumandolo al total */
  public agregarItem(item: ItemConCantidad) {
    item.cantidad += 1;

    this.total += item.precio ?? 0;
    this.mostrarToast();

    this.pedidoService.add(item);
  }

  /** Quita el producto al pedido, restandolo del total */
  public quitarItem(item: ItemConCantidad) {
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (item.cantidad <= 0) return;

    item.cantidad--;

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

    // Aplanar los items para recorrerlos más facilmente
    const itemsAplanados = this.categorias.map(cat => cat.items).flat();

    // Primero limpiar todas las cantidades que pueden estar guardadas en memoria
    itemsAplanados.forEach(itemConCantidad => {
      itemConCantidad.cantidad = 0;
    });

    const pedido = this.pedidoService.get();
    if (pedido && pedido.lineas) {
      pedido.lineas.forEach(linea => {
        // Buscar el item correspondiente a la linea y asignarle la cantidad pedida
        const itemConCantidad = itemsAplanados.find((item: ItemConCantidad) => item.id === linea.idItem);
        // El item puede haber sido eliminado de la base de datos mientras estaba guardado en el pedido de un cliente
        // Este chequeo es para que no haya un error de referencia
        if (itemConCantidad) {
          itemConCantidad.cantidad = linea.cantidad;

          if (itemConCantidad.precio) {
            this.total += itemConCantidad.precio * itemConCantidad.cantidad;
          }
        }
        else {
          // Como el item guardado no existe mas, eliminar la linea del pedido
          this.pedidoService.eliminarLinea(linea);
          console.log('Se eliminó el item \'' + linea.idItem + '\' porque ya no existe en el catálogo');
        }
      });
    }
  }
}
