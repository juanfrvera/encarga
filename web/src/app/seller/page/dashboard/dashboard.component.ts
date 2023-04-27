import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from '../../category/category.facade';
import { ItemFacade } from '../../feature/item/item.facade';
import { IItemLite } from '../../dto/item.lite';
import { ICategoryLite } from '../../category/model/category.lite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public view: {
    categories?: {
      list?: ICategoryLite[];
      showEmptyState?: boolean;
    };
    items?: {
      list?: IItemLite[];
      showEmptyState?: boolean;
    };
  } = {};

  constructor(
    private itemFacade: ItemFacade,
    private categoryFacade: CategoryFacade,
  ) { }

  ngOnInit(): void {
    this.itemFacade.getList().then((list) => {
      if (!this.view.items) {
        this.view.items = {};
      }

      this.view.items.list = list;

      this.view.items.showEmptyState = list.length <= 0;
    });

    this.categoryFacade.getList().then((list) => {
      if (!this.view.categories) {
        this.view.categories = {};
      }

      this.view.categories.list = list;

      this.view.categories.showEmptyState = list.length <= 0;

    });
  }
}
