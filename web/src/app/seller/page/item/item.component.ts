import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoryFacade } from '../../feature/category/category.facade';
import { CategoryLite } from '../../data/category/category-lite.data';
import { ModalCrudComponent } from '../../component/modal-crud/modal-crud.component';
import { Item } from '../../data/item/item.data';
import { ItemLite } from '../../data/item/item-lite.data';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;

  public view: {
    categories?: CategoryLite[];
    items?: ItemLiteUI[];
    modal?: {
      editing: boolean;
      item: Item;
    }
  } = {};


  constructor(
    private readonly categoryFacade: CategoryFacade,
    public readonly itemFacade: ItemFacade,
  ) { }

  ngOnInit(): void {

    this.categoryFacade.getList().then((list) => {
      this.view.categories = list;

      if (this.view.items && this.view.categories) {
        this.fillItemsWithCategories(this.view.items, this.view.categories);
      }
    });

    this.itemFacade.getList().then((list) => {
      this.view.items = list;

      if (this.view.items && this.view.categories) {
        this.fillItemsWithCategories(this.view.items, this.view.categories);
      }
    });
  }

  /**
   * Fill items with their categories names
   * @param items List of items
   * @param categories List of categories
   */
  private fillItemsWithCategories(items: ItemLiteUI[], categories: CategoryLite[]) {
    items.forEach(i => {
      if (i.categoryIdList) {
        i.categoryNameList = categories.filter(c => i.categoryIdList.includes(c._id)).map(c => c.name);
      }
    })
  }

  public productClick(item: Item) {
    this.view.modal  = {
      editing: true,
      item
    };
    this.modal.open();
  }

  public addProductClick() {
    this.view.modal  = {
      editing: false,
      item: {} as Item
    };
    this.modal.open();
  }

  public deleteProduct() {

  }
  

}

interface ItemLiteUI extends ItemLite {
  categoryNameList?: string[];
}