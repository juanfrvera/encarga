import { Component, OnInit } from '@angular/core';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoryFacade } from '../../feature/category/category.facade';
import { CategoryLite } from '../../data/category/category-lite.data';
import { ItemLite } from '../../data/item/item-lite.data';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public view: {
    categories?: {
      list?: CategoryLite[];
      showEmptyState?: boolean;
    };
    items?: {
      list?: ItemLiteUI[];
      showEmptyState?: boolean;
    };
  } = {};

  constructor(
    private readonly categoryFacade: CategoryFacade,
    private readonly itemFacade: ItemFacade,
  ) { }

  ngOnInit(): void {
    this.categoryFacade.getList().then((list) => {
      if (!this.view.categories) {
        this.view.categories = {};
      }

      this.view.categories.list = list;

      this.view.categories.showEmptyState = list.length <= 0;

      if (this.view.items && this.view.items.list && this.view.categories && this.view.categories.list) {
        this.fillItemsWithCategories(this.view.items.list, this.view.categories.list);
      }
    });

    this.itemFacade.getList().then((list) => {
      if (!this.view.items) {
        this.view.items = {};
      }

      this.view.items.list = list;

      this.view.items.showEmptyState = list.length <= 0;

      if (this.view.items && this.view.items.list && this.view.categories && this.view.categories.list) {
        this.fillItemsWithCategories(this.view.items.list, this.view.categories.list);
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

}

interface ItemLiteUI extends ItemLite {
  categoryNameList?: string[];
}