import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Item } from '../../../data/item';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements AfterViewInit {
  @ViewChild('modal', { static: true }) modalElement: ElementRef;
  private modal: Modal;

  public get Items() {
    return this.itemService.Items;
  }

  constructor(
    private itemService: ItemService
  ) { }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  /** Muestra el modal en modo creacion */
  public agregar() {
    this.abrir();
  }

  /** Muestra el modal en modo edicion */
  public editar(item: Item) {
    this.abrir(item);
  }

  private abrir(item?: Item) {
    this.modal.show();
  }

}
