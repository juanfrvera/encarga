import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'bootstrap';
import { CategoryService } from 'src/app/cliente/service/category.service';
import { ItemService } from '../../service/item.service';
import { CategoryLite } from '../../data/category/category-lite.data';
import { ItemLite } from '../../data/item/item-lite.data';


interface IAccordionCategory extends CategoryLite {
  items?: ItemLite[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('accordion', { static: true }) accordionElement: ElementRef;
  @ViewChild('toast', { static: true }) toastElement: ElementRef;

  private toast: Toast;

  public ui: {
    accordionCategories?: IAccordionCategory[],
    total: number
  } = {
      total: 0
    }

  private catCount: number;
  private orphanCount: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly categoryService: CategoryService,
    private readonly itemService: ItemService,
    private readonly pedidoService: PedidoService,
  ) { }

  async ngOnInit() {
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


    if (this.pedidoService.hayPedido()) {
      //this.reflectPedido();
    }
  }

  ngOnDestroy() {
    this.hideToast();
  }

  public loadItems(accordionCategory: IAccordionCategory) {
    if (!accordionCategory.items) {
      this.itemService.getListByCategoryId(accordionCategory._id).then(list => {
        accordionCategory.items = list;
      });
    }
  }

  /** Agrega el producto al pedido, sumandolo al total 
  public add(item: ItemLite) {
    const itemData = this.getItemData(item._id);

    if (itemData) {
      itemData.count++;

      if (!this.ui.total) {
        this.ui.total = 0;
      }

      this.ui.total += item.price ?? 0;
      this.showToast();

      this.pedidoService.add(item._id);
    }
    else {
      console.error('Ocurrió un error al querer agregar el item');
    }
  }

  public itemCount(itemId: string) {
    return this.getItemData(itemId)?.count ?? 0;
  }

  public getListByCategoria(categoriaId: string) {
    return this.itemService.getListByCategoriaId(categoriaId);
  }

  public getItemData(itemId: string) {
    let itemData: ItemData | undefined;

    if (this.model.categoriaWithItemsList) {
      if (this.CurrentCategoriaIndex) {
        const categoriaWithItems = this.model.categoriaWithItemsList[this.CurrentCategoriaIndex];

        if (categoriaWithItems) {
          const itemDataList = categoriaWithItems.itemDataList;

          if (itemDataList) {
            itemData = itemDataList.find(d => d.id == itemId);

            if (itemData) {
              return itemData;
            }
          }
        }
      }

      for (const categoriaWithItems of this.model.categoriaWithItemsList) {
        if (categoriaWithItems.itemDataList) {
          itemData = categoriaWithItems.itemDataList.find(d => d.id == itemId);

          if (itemData) {
            return itemData;
          }
        }
      }
    }

    return null;
  }
  */

  /** Quita el producto al pedido, restandolo del total 
  public removeItem(item: ItemLightDto) {
    const objetoCantidad = this.getItemData(item.id);
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (!objetoCantidad || objetoCantidad.count <= 0) return;

    objetoCantidad.count--;

    if (this.model.total) {
      // Resta el producto del total
      this.model.total -= item.price ?? 0;
    }

    // Si el total esta en 0, no muestra ningun toast con total
    // tslint:disable-next-line: triple-equals
    if (!this.hasPedido()) {
      this.hideToast();
    }
    // Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.showToast();
    }

    this.pedidoService.remove(item.id);
  }

  */

  /** Continua a la pagina de detalle 
  public continue() {
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  private hasPedido() {
    return this.model.total;
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

  /** Carga las cantidades pedidas a los items con cantidad y calcula la variable total 
  private reflectPedido() {
    this.model.total = 0;

    const pedido = this.pedidoService.get();

    const itemIdList = pedido.lines.map(l => l.itemId);
    this.itemService.getListByIdList(itemIdList).subscribe(items => {
      pedido.lines.forEach(line => {
        const item = items.find(i => i.id === line.itemId);
        // El item puede haber sido eliminado de la base de datos mientras estaba guardado en el pedido de un cliente
        // Este chequeo es para que no haya un error de referencia
        if (item) {
          if (item.price) {
            this.model.total! += item.price * line.count;
          }
        }
        else {
          // Como el item guardado no existe mas, eliminar la linea del pedido
          this.pedidoService.deleteLine(line);
          console.log('Se eliminó el item \'' + line.itemId + '\' porque ya no existe en el catálogo');
        }
      });

      if (this.model.total) {
        this.showToast();
      }
    });
  }
  */
}
