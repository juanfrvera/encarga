import { Component, OnInit } from '@angular/core';
import { CategoriaLightDto } from '../../dto/categoria.light.dto';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private categoriaList: CategoriaLightDto[];

  public get CategoriaList() {
    return this.categoriaList;
  }

  public get Service() {
    return this.service;
  }

  constructor(
    private readonly service: ItemFacade,
    private readonly categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getList$().subscribe(list => {
      this.categoriaList = list;
    });
  }
}
