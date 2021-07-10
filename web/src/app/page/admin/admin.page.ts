import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/service/item.service';
import { ItemComponent } from '../../component/item/item.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  public items: Item[];

  public get Items() {
    return this.itemService.get()
  }
  
  constructor(
    private modalController: ModalController,
    private itemService: ItemService
    ) { }

  ionViewWillLeave() {
    this.Items;
  }

  public crearItem() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
