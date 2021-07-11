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

  public get Items() {
    return this.itemService.Items;
  }

  constructor(
    private modalController: ModalController,
    private itemService: ItemService
  ) { }

  /** Presenta el modal */
  async presentModal(item?: Item) {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        editando: true,
        item
      }
    });
    return await modal.present();
  }

  public clickAgregarItem() {
    this.presentModal();
  }

  public clickEditarItem(item: Item) {
    this.presentModal(item);
  }


}
