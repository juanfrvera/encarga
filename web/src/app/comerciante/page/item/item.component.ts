import { Component, OnInit } from '@angular/core';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoriaApi } from '../../categoria/categoria.api';
import { CategoriaLightDto } from '../../categoria/model/categoria.light.dto';
import { CategoriaFacade } from '../../categoria/categoria.facade';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private categoriaList: CategoriaLightDto[] | undefined;

  public get CategoriaList() {
    return this.categoriaList;
  }

  public get Service() {
    return this.service;
  }

  constructor(
    private readonly service: ItemFacade,
    private readonly categoriaFacade: CategoriaFacade) { }

  ngOnInit(): void {
    this.categoriaFacade.getList$().subscribe(list => {
      this.categoriaList = list;
    });
  }
}
