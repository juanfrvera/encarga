import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemComponent } from '../../component/item/item.component';
import { Item } from '../../data/item';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  public get Items() {
    return this.itemService.Items;
  }

  constructor(
    private modalController: ModalController,
    private itemService: ItemService
  ) { }

  ngOnInit() {
  }

  /** Presenta el modal */
  async presentModal(item?: Item) {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'modalCustom',
      componentProps: {
        editando: true,
        item
      }
    });
    return await modal.present();
  }

  /** Muestra el modal en modo creacion */
  public clickAgregarItem() {
    this.presentModal();
  }

  /** Muestra el modal en modo edicion */
  public clickEditarItem(item: Item) {
    this.presentModal(item);
  }


}

