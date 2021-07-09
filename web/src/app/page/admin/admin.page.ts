import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComponent } from '../../component/item/item.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public crearItem() {
    const modal = this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
