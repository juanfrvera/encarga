import { Component } from '@angular/core';
import { MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ModalFoodComponent } from '../../modal/modal-food/modal-food.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly foodFolder = "../../assets/img/food/";
  
  public get Categorias() {
    return this.productoService.Categorias;
  }

  constructor(
    private pedido: PedidoService,
    public productoService: ProductoService,
    public modalController: ModalController,
    public menuController: MenuController,
    public toastController: ToastController, 
    public navCtrl: NavController
  ) {

  }

  /**Muestra el modal de informacion de comida */
  public clickFood(food) {
    this.presentModal(food);
  }

  /**Crea el modal */
  async presentModal(food) {
    const modal = await this.modalController.create({
      component: ModalFoodComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'food': food
      }
    });
    return await modal.present();
  }

  /**Muestra el toast con el total */
  public mostrarTotal() {
    this.presentToastWithOptions();
  }

  /**Crea el toast */
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Total',
      message: '$' + this.pedido.total.toString(),
      position: 'bottom',
      buttons: [
        {
          text: 'Continuar',
          role: 'submit',
          //TODO: Pasar a la vista de pago
          handler: () => {
            this.navCtrl.navigateForward('/detalle')
          }
        }
      ]
    });
    await toast.present();
  }

  /**Redirige a la categoria seleccionada en el menu */
  public clickCategoria(idCategoria: string) {
    //Obtiene el elemento, se redirige a esa zona de la pagina y cierra el menu
    const element = document.getElementById(idCategoria);
    element.scrollIntoView({ behavior: "smooth", block: 'start' });
    this.menuController.close();
  }

  /**Agrega el producto al pedido, sumandolo al total */
  public agregarProducto(food) {
    //Se fija si hay alguna cantidad
    if (food.cantidad) {
      food.cantidad += 1;
    }
    //Cantidad en 0
    else {
      food.cantidad = 1;
    }

    //Se fija si el total es 0, suma el producto y muestra el total
    if (this.pedido.total == 0) {
      this.pedido.total = this.pedido.total + food.price;
      this.mostrarTotal();
    }
    //El total ya es mayor que 0, por lo que suma el producto, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.pedido.total = this.pedido.total + food.price;
      this.toastController.dismiss();
      this.mostrarTotal();
    }

    this.pedido.add(food);
  }

  /**Quita el producto al pedido, restandolo del total */
  public quitarProducto(food) {
    //Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (food.cantidad > 0) {
      food.cantidad -= 1;
    }

    //Resta el producto del total
    this.pedido.total = this.pedido.total - food.price;

    //Si el total esta en 0, no muestra ningun toast con total
    if (this.pedido.total == 0) {
      this.toastController.dismiss();
    }
    //Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.toastController.dismiss();
      this.mostrarTotal();
    }

    this.pedido.remove(food);
  }

}
