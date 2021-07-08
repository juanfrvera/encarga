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

  public total: number = 0;

  //Datos falsos
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

  /**Obtiene la lista de categorias */
  public get Categorias() {
    return [this.promos, this.pizzas, this.minutas, this.empanadas, this.bebidas]
  }

  constructor(
    public modalController: ModalController,
    public menuController: MenuController,
    public toastController: ToastController
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
      message: '$' + this.total.toString(),
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
    if (this.total == 0) {
      this.total = this.total + food.price;
      this.mostrarTotal(); 
    }
    //El total ya es mayor que 0, por lo que suma el producto, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.total = this.total + food.price;
      this.toastController.dismiss();
      this.mostrarTotal();
    }

  }

  /**Quita el producto al pedido, restandolo del total */
  public quitarProducto(food) {
    //Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (food.cantidad > 0) {
      food.cantidad -= 1;
    }
    
    //Resta el producto del total
    this.total = this.total - food.price;

    //Si el total esta en 0, no muestra ningun toast con total
    if (this.total == 0) {
      this.toastController.dismiss();
    }
    //Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.toastController.dismiss();
      this.mostrarTotal();
    }

  }

}
