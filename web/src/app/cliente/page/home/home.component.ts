import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'bootstrap';
import { CategoryService } from 'src/app/cliente/service/category.service';
import { ItemService } from '../../service/item.service';
import { CategoryLite } from '../../data/category/category-lite.data';
import { ItemLite } from '../../data/item/item-lite.data';
import { ShopService } from '../../service/shop.service';

interface IAccordionCategory extends CategoryLite {
  items?: IAccordionItem[];
}

interface IAccordionItem extends ItemLite {
  count?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('toast', { static: true }) toastElement: ElementRef;

  private toast: Toast;

  public ui: {
    accordionCategories?: IAccordionCategory[],
    total: number,
    shopName?: string
  } = {
      total: 0,
      shopName: ''
    }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly categoryService: CategoryService,
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
    private readonly shopService: ShopService
  ) { }

  async ngOnInit() {
    this.ui.shopName = await this.shopService.getShopNameByPath();

    this.toast = new Toast(this.toastElement.nativeElement, { autohide: false });
    let catCount: number;
    let orphanCount: number;
    try {
      // Get count of categories for this shop
      catCount = await this.categoryService.count();
    } catch (error) {
      // If error is because there's no shop, redirect to 404 page
      console.log('No shop found, show 404 page');
      return;
    }

    // Get count of orphan items for this shop
    orphanCount = await this.itemService.orphanCount();

    // If there are categories
    if (catCount > 0) {
      // Get categories and add to accordion without items loaded
      const categories = await this.categoryService.getList();
      this.ui.accordionCategories = [...categories];

      // If it also has orphan items, add that category without items loaded too
      if (orphanCount > 0) {
        this.ui.accordionCategories.push({ _id: 'orphan', name: 'Otros' });
      }
    }
    // If there arent any categories
    else if (orphanCount > 0) {
      // Add "all" category without items loaded too
      this.ui.accordionCategories = [{ _id: 'orphan', name: 'Todos' }];
    } else {
      this.ui.accordionCategories = [];
    }


    if (this.orderService.hasOrder()) {
      this.reflectOrder();
    }
  }

  ngOnDestroy() {
    this.hideToast();
  }

  public loadItems(accordionCategory: IAccordionCategory) {
    if (!accordionCategory.items) {
      if (accordionCategory._id == 'orphan') {
        this.itemService.getOrphanItems().then(list => {
          accordionCategory.items = list.map(item => ({ ...item, count: this.orderService.getItemCount(item._id) }));
        })
      }
      else {
        this.itemService.getListByCategoryId(accordionCategory._id).then(list => {
          accordionCategory.items = list.map(item => ({ ...item, count: this.orderService.getItemCount(item._id) }));
        });
      }

    }
  }

  // Add product to order
  public addItem(item: ItemLite, currentIndex: number) {
    const accordionItem = this.getAccordionItemData(item._id, currentIndex);
    console.log(accordionItem)

    if (accordionItem) {
      accordionItem.count!++;

      this.ui.total += Number(item.price) ?? 0;
      this.showToast();

      this.orderService.add(item._id);
    }

  }

  // Remove item from order
  public removeItem(item: ItemLite, currentIndex: number) {
    const accordionItem = this.getAccordionItemData(item._id, currentIndex);
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (!accordionItem || (accordionItem && ((accordionItem.count && accordionItem.count <= 0) || !accordionItem.count))) return;

    if (accordionItem.count && accordionItem.count > 0) {
      accordionItem.count--;

      // Resta el producto del total
      this.ui.total -= Number(item.price) ?? 0;

      // Si el total esta en 0, no muestra ningun toast con total
      if (!this.hasPedido()) {
        this.hideToast();
      }
      // Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
      else {
        this.showToast();
      }

      this.orderService.remove(item._id);
    }
  }

  public getAccordionItemData(itemId: string, currentIndex: number) {
    let accordionItemData: IAccordionItem | undefined;

    if (this.ui.accordionCategories) {
      const currentAccordionCat = this.ui.accordionCategories[currentIndex];

      if (currentAccordionCat) {
        const itemList = currentAccordionCat.items;

        if (itemList) {
          accordionItemData = itemList.find(i => i._id == itemId);

          if (accordionItemData) {
            return accordionItemData;
          }
        }
      }
    }
    return accordionItemData
  }

  private hasPedido() {
    return this.ui.total;
  }


  /** Continua a la pagina de detalle 
  public continue() {
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  */

  /** Muestra el toast */
  private showToast() {
    this.toast.show();
  }

  /** Oculta el toast */
  private hideToast() {
    this.toast.hide();
  }

  // Carga las cantidades pedidas a los items con cantidad y calcula la variable total 
  private reflectOrder() {
    this.ui.total = 0;

    const order = this.orderService.getOrder();

    if (order.lines) {
      const itemIdList = order.lines.map(l => l.itemId);

      this.itemService.getListByIdList(itemIdList).then(list => {
        if (order.lines) {
          order.lines.forEach(line => {
            const item = list.find(i => i._id === line.itemId);
            // El item puede haber sido eliminado de la base de datos mientras estaba guardado en el pedido de un cliente
            // Este chequeo es para que no haya un error de referencia
            if (item) {
              if (item.price) {
                this.ui.total += Number(item.price) * line.count;
              }
            }
            else {
              // Como el item guardado no existe mas, eliminar la linea del pedido
              this.orderService.deleteLine(line);
              console.log('Se eliminó el item \'' + line.itemId + '\' porque ya no existe en el catálogo');
            }
          });
        }

        if (this.ui.total) {
          this.showToast();
        }
      })
    }

  }

}
