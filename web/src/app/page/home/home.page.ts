import { Component } from '@angular/core';
import { MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/service/pedido.service';
import { ItemService } from 'src/app/service/item.service';
import { ModalFoodComponent } from '../../modal/modal-food/modal-food.component';
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

      const pedido = pedidoService.get();
      if (pedido && pedido.lineas) {
        pedido.lineas.forEach(linea => {
          // Buscar el item correspondiente a la linea y asignarle la cantidad pedida
          const itemConCantidad = categoria.items.find(item => item.id === linea.idItem);
          itemConCantidad.cantidad = linea.cantidad;
        });
      }

      this.categorias = [categoria];
    }, error => {
      console.error(error);
    });
  }

  ionViewWillEnter() {
    if (this.pedidoService.total > 0) {
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
    this.pedidoService.add(item);
    // Se fija si hay alguna cantidad
    if (item.cantidad) {
      item.cantidad += 1;
    }
    // Cantidad en 0
    else {
      item.cantidad = 1;
    }

    // Se fija si el total es 0, suma el producto y muestra el total
    // tslint:disable-next-line: triple-equals
    if (this.pedidoService.total == 0) {
      this.pedidoService.total = this.pedidoService.total + item.precio;
      this.mostrarTotal();
    }
    // El total ya es mayor que 0, por lo que suma el producto, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.pedidoService.total = this.pedidoService.total + item.precio;
      this.toastController.dismiss();
      this.mostrarTotal();
    }

    this.pedidoService.add(item);
  }

  /** Quita el producto al pedido, restandolo del total */
  public quitarItem(item: ItemConCantidad) {
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (item.cantidad > 0) {
      item.cantidad -= 1;
    }

    // Resta el producto del total
    this.pedidoService.total = this.pedidoService.total - item.precio;

    // Si el total esta en 0, no muestra ningun toast con total
    // tslint:disable-next-line: triple-equals
    if (this.pedidoService.total == 0) {
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
  private async presentModal(food) {
    const modal = await this.modalController.create({
      component: ModalFoodComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        food
      }
    });
    return await modal.present();
  }
  /** Crea el toast */
  private async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Total',
      message: '$' + this.pedidoService.total.toString(),
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
