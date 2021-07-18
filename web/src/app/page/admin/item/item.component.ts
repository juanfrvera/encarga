import { Component } from '@angular/core';
import { Item } from '../../../data/item';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  public get Items() {
    return this.itemService.Items;
  }

  constructor(
    private itemService: ItemService
  ) { }

  /** Muestra el modal en modo creacion */
  public clickAgregarItem() {
    this.abrirModal();
  }

  /** Muestra el modal en modo edicion */
  public clickEditarItem(item: Item) {
    this.abrirModal(item);
  }

  private abrirModal(item?: Item) {

  }

}
