import { Component, OnInit } from '@angular/core';
import { ItemFacade } from '../../feature/item/item.facade';
import { ICategoryLite } from '../../category/model/category.lite';
import { CategoryFacade } from '../../category/category.facade';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private categoriaList: ICategoryLite[] | undefined;

  public get CategoriaList() {
    return this.categoriaList;
  }

  public get Service() {
    return this.service;
  }

  constructor(
    private readonly service: ItemFacade,
    private readonly categoriaFacade: CategoryFacade) { }

  ngOnInit(): void {
    this.categoriaFacade.getList$().subscribe(list => {
      this.categoriaList = list;
    });
  }
}
