import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFoodComponent } from '../modal/modal-food/modal-food.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly foodFolder = "../../assets/img/food/";

  public promos = [
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

  constructor(public modalController: ModalController) {

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

}
