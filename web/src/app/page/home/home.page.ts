import { Component } from '@angular/core';
import { MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/service/pedido.service';
import { ItemService } from 'src/app/service/item.service';
import { ModalItemComponent } from '../../modal/modal-item/modal-item.component';
import { Item } from 'src/app/data/item';
import { ItemConCantidad } from 'src/app/data/item-con-cantidad';
import { CategoriaConItemsConCantidad } from 'src/app/data/categoria-con-items';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly foodFolder = '../../assets/img/food/';

  private categorias: CategoriaConItemsConCantidad[];
  private total = 0;

  public get Categorias() {
    return this.categorias;
  }

  constructor(
    itemService: ItemService,
    private pedidoService: PedidoService,
    private modalController: ModalController,
    private menuController: MenuController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    itemService.getAll().subscribe(items => {
      // TODO: cambiar este código temporal
      // Código temporal hasta que tengamos categorias
      const categoria: CategoriaConItemsConCantidad = { id: '0', titulo: 'Todos', items: [] };

      categoria.items = items.map(item => {
        // Convierte un item a item con cantidad
        // Descomponiendo las propiedades de item y agregandole cantidad
        return { ...item, cantidad: 0 };
      });

      this.categorias = [categoria];
      this.reflejarPedido();

      if (this.hayPedido()) {
        this.mostrarTotal();
      }
    }, error => {
      console.error(error);
    });
  }

  /** Carga las cantidades pedidas a los items con cantidad y calcula la variable total */
  private reflejarPedido() {
    // Aplanar los items para recorrerlos más facilmente
    const itemsAplanados = this.categorias.map(cat => cat.items).flat();
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
          console.log('Se eliminó el item \'' + itemConCantidad.titulo + '\' porque ya no existe en el catálogo');
        }
      });
    }
  }

  private hayPedido() {
    return this.total > 0;
  }

  ionViewWillEnter() {
    if (this.hayPedido()) {
      this.mostrarTotal();
    }
  }

  /** Muestra el modal de informacion de comida */
  public clickItem(item: Item) {
    this.presentModal(item);
  }

  /** Muestra el toast con el total */
  public mostrarTotal() {
    this.presentToastWithOptions();
  }
  /** Redirige a la categoria seleccionada en el menu */
  public clickCategoria(idCategoria: string) {
    // Obtiene el elemento, se redirige a esa zona de la pagina y cierra el menu
    const element = document.getElementById(idCategoria);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuController.close();
  }

  /** Agrega el producto al pedido, sumandolo al total */
  public agregarItem(item: ItemConCantidad) {
    item.cantidad += 1;

    // Borra el toast anterior
    if (this.hayPedido()) {
      this.toastController.dismiss();
    }
    this.total += item.precio;
    this.mostrarTotal();

    this.pedidoService.add(item);
  }

  /** Quita el producto al pedido, restandolo del total */
  public quitarItem(item: ItemConCantidad) {
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (item.cantidad > 0) {
      item.cantidad -= 1;
    }

    // Resta el producto del total
    this.total -= item.precio;

    // Si el total esta en 0, no muestra ningun toast con total
    // tslint:disable-next-line: triple-equals
    if (!this.hayPedido()) {
      this.toastController.dismiss();
    }
    // Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.toastController.dismiss();
      this.mostrarTotal();
    }

    this.pedidoService.remove(item);
  }

  /** Crea el modal */
  private async presentModal(item) {
    const modal = await this.modalController.create({
      component: ModalItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        item
      }
    });
    return await modal.present();
  }
  /** Crea el toast */
  private async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Total',
      message: '$' + this.total.toString(),
      position: 'bottom',
      buttons: [
        {
          text: 'Continuar',
          role: 'submit',
          handler: () => {
            this.navCtrl.navigateForward('/detalle');
          }
        }
      ]
    });
    await toast.present();
  }
}
