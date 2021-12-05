import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/comerciante/service/item.service';
import { CategoriaLightDto } from '../../dto/categoria.light.dto';
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
    private readonly service: ItemService,
    private readonly categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getList().subscribe(list => {
      this.categoriaList = list;
    });
  }
}
