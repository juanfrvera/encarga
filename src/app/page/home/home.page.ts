import { Component } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { ModalFoodComponent } from '../../modal/modal-food/modal-food.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly foodFolder = "../../assets/img/food/";

  public promos = {
    titulo: 'Promos',
    items: [
      {
        title: "Choripan",
        description: "Chorizo, salsa a eleccion",
        price: 200
      },
      {
        title: "Docena de empanadas surtidas",
        description: "carne, pollo, verdura",
        price: 300
      },
      {
        title: "2 Muzzas + 1 docena de empanadas",
        description: "jamon y queso, pollo o verdura",
        price: 600
      },
      {
        title: "2 Muzzas + 1 Especial",
        price: 500
      },
    ]
  }
  public pizzas = {

    titulo: "Pizzas",
    items:
      [
        {
          title: "Muzzarella",
          description: "muzarrella, salsa, oregano",
          price: 200
        },
        {
          title: "Fugazzetta",
          description: "muzarrella, salsa, cebolla grillada",
          price: 320
        },
        {
          title: "Pepperoni",
          description: "muzarrella, salsa, salame milan",
          price: 400
        },
        {
          title: "Rellena",
          description: "rellena con jamon y queso, exterior muzarrella y tomate",
          price: 600
        }
      ]
  }

  public minutas = {
    titulo: "Minutas",
    items:
      [
        {
          title: "Sandwich de miga",
          description: "jamon y queso, mayonesa",
          price: 200
        },
        {
          title: "Sandwich de milanesa",
          description: "milanesa de ternera, lechuga, tomate, jamon y queso",
          price: 320
        },
        {
          title: "Hamburguesa completa",
          description: "hamburguesa de ternera, lechuga, tomate, jamon y queso",
          price: 400
        },
        {
          title: "Milanesa napolitana",
          description: "milanesa de ternera, tomate, jamon y queso",
          price: 600
        }
      ]
  }

  public empanadas = {
    titulo: "Empanadas",
    items:
      [
        {
          title: "Jamon y queso",
          price: 100
        },
        {
          title: "Carne",
          price: 100
        },
        {
          title: "Verdura",
          price: 100
        },
        {
          title: "Pollo",
          price: 100
        }
      ]
  }

  public bebidas = {
    titulo: "Bebidas",
    items:
      [
        {
          title: "Gaseosa chica",
          price: 100
        },
        {
          title: "Gaseosa grande",
          price: 200
        },
        {
          title: "Agua chica",
          price: 100
        },
        {
          title: "Agua saborizada",
          price: 200
        },
        {
          title: "Exprimido de naranja",
          price: 200
        }
      ]
  }

  public get Categorias() {
    return [this.promos, this.pizzas, this.minutas, this.empanadas, this.bebidas]
  }

  constructor(
    public modalController: ModalController,
    public menuController: MenuController,
    public toastController: ToastController
  ) {

  }

  public clickFood(food) {
    this.presentModal(food);
  }

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

  public mostrarTotal() {
    this.presentToastWithOptions();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Total',
      message: '$1200', //TODO: poner la suma total del pedido
      position: 'bottom',
      buttons: [
        {
          text: 'Continuar',
          role: 'submit',
          //TODO: Pasar a la vista de pago
          handler: () => {
            console.log('Pasar a la parte de pago');
          }
        }
      ]
    });
    await toast.present();
  }

  public clickCategoria(idCategoria: string) {
    const element = document.getElementById(idCategoria);
    element.scrollIntoView({ behavior: "smooth", block: 'start' });
    this.menuController.close();
  }

  public agregarCantidad(food) {
    if (food.cantidad) {
      food.cantidad += 1;
    }
    else {
      food.cantidad = 1;
    }

    this.mostrarTotal();
  }

  public quitarCantidad(food) {
    if (food.cantidad > 0) {
      food.cantidad -= 1;
    }

  }

}
