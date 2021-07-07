import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { IonMenuToggle, IonToggle, MenuController, ModalController } from '@ionic/angular';
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
        img: this.foodFolder + "choripan.jpg",
        price: 200
      },
      {
        title: "Empanadas",
        img: this.foodFolder + "empanadas.jpg",
        price: 300
      },
      {
        title: "Empanadas árabes",
        img: this.foodFolder + "empanadas-arabes.jpg",
        price: 370
      },
      {
        title: "Fugazzeta",
        img: this.foodFolder + "pizza-fugazzeta.jpg",
        price: 320
      },
      {
        title: "Pepperoni",
        img: this.foodFolder + "pizza-pepperoni.jpg",
        price: 400
      },
      {
        title: "Rellena",
        img: this.foodFolder + "pizza-rellena.jpg",
        price: 600
      },
      {
        title: "Sandwich",
        img: this.foodFolder + "sandwich.jpg",
        price: 200
      },
      {
        title: "Sandwich Milanesa",
        img: this.foodFolder + "sandwich-milanesa.jpg",
        price: 250
      },
    ]
  }
  public pizzas = {

    titulo: "Pizzas",
    items:
      [
        {
          title: "Muzzarella",
          price: 200
        },
        {
          title: "Fugazzetta",
          price: 320
        },
        {
          title: "Pepperoni",
          price: 400
        },
        {
          title: "Rellena",
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
          price: 200
        },
        {
          title: "Sandwich de milanesa",
          price: 320
        },
        {
          title: "Hamburguesa completa",
          price: 400
        },
        {
          title: "Milanesa napolitana con fritas",
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
    public menuController: MenuController
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

  public clickCategoria(idCategoria: string) {
    const element = document.getElementById(idCategoria);
    element.scrollIntoView({ behavior: "smooth", block: 'start' });
    this.menuController.close();
  }

}
