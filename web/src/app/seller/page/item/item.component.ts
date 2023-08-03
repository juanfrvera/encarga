import { Component, OnInit } from '@angular/core';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoryFacade } from '../../feature/category/category.facade';
import { CategoryLite } from '../../data/category/category-lite.data';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private categoriaList: CategoryLite[] | undefined;

  public get CategoriaList() {
    return this.categoriaList;
  }

  constructor(
    private readonly categoryFacade: CategoryFacade,
    public service: ItemFacade,
  ) { }

  ngOnInit(): void {
    this.categoryFacade.getList().then(list => this.categoriaList = list);
  }

}
