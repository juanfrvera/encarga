import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { FormularioComponent } from '../../../shared/component/formulario/formulario.component';
import { Util } from '../../../util';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { ItemLite } from '../../data/item/item-lite.data';
import { ShopService } from '../../service/shop.service';

interface IListItem extends ItemLite {
  count?: number;
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;

  public ui: {
    itemList?: IListItem[],
    total: number,
    form: {
      name: string,
      deliverOptions: string,
      address: string,
      notes: string,
    },
    shopPhone?: string
  } = { form: { name: '', deliverOptions: 'Envio a domicilio', address: '', notes: '' }, total: 0 };

  public finished = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
    private readonly shopService: ShopService
  ) { }

  ngOnInit() {
    const order = this.orderService.getOrder();

    if (order && order.lines) {
      // Get item id list
      const itemIdList = order.lines.map(l => l.itemId);
      // Ask for those full items y store with their quantities
      this.itemService.getListByIdList(itemIdList).then(itemList => {
        this.ui.itemList = itemList.map(item => {
          // Order line corresponding to that item mapped
          const orderLine = order.lines?.find(line => line.itemId === item._id) ?? { count: 0 };

          // Compute order's total
          if (item.price) {
            this.ui.total += Number(item.price) * orderLine.count;
          }

          // Return item with count
          return { ...item, count: orderLine.count } as IListItem
        });
      });
    }
    else {
      // Empty list means empty cart so it shows empty state
      this.ui.itemList = [];
    }

    // Get shop phone to send order
    this.shopService.getShopPhoneByPath().then(phone => this.ui.shopPhone = phone)
  }

  // Compute subtotal price
  public subtotal(price: string, count: number) {
    return Number(price) * count
  }

  // Adds item to cart
  public addItem(item: IListItem) {
    if (item.count) {
      item.count++;
      this.orderService.add(item._id);

      this.ui.total += Number(item.price) ?? 0;
    }
  }

  // Removes item from cart
  public removeItem(item: IListItem) {
    if (item.count) {
      item.count--;
      this.orderService.remove(item._id);

      this.ui.total -= Number(item.price) ?? 0;

      // Delete line to avoid negative count
      if (item.count <= 0 && this.ui.itemList) {
        Util.deleteElement(this.ui.itemList, item);
      }
    }
  }

  public clickGoBack() {
    // Go to father route
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Clean cart/order
  public clean() {
    this.orderService.deleteAllLines();
    this.ui.itemList = [];
  }

  // Send order to shop whatsapp phone
  public clickFinish() {
    this.finished = true;

    // Form data
    const form = this.ui.form;
    
    if (this.formulario.isValid() && (form.deliverOptions !== 'Envio a domicilio' || form.address) && this.ui.itemList) {
      // Adds the message to the body
      let body = `*DETALLE DE ENTREGA*\nNombre y Apellido:\n_${form.name}_\nForma de entrega:\n_${form.deliverOptions}${form.deliverOptions == 'Envio a domicilio' ? ' / ' + form.address : ''}_\nComentarios:\n_${form.notes}_\n\n*DETALLE DE PEDIDO*\n`;

      // Adds items, their quantities and subtotal to body
      for (const e of this.ui.itemList) {
        body += `_${e.count} X ${e.name} : $${e.count! * (Number(e.price) ?? 0)}_\n`;
      }
      // Adds total to body
      body += `\n*TOTAL*\n$${this.ui.total}`;

      // Generates whatsapp message link
      const url = `https://wa.me/${this.ui.shopPhone}/?text=` + encodeURI(body);
      // Opens the link
      window.open(url, '_blank');
    }
    else {
      this.formulario.showFeedback();
    }
  }
  
}


