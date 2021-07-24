import { Component } from '@angular/core';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  public get Service() {
    return this.itemService;
  }

  constructor(private itemService: ItemService) { }
}
