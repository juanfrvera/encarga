import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  public get Service() {
    return this.itemService;
  }

  public get Categorias() {
    return this.categoriaService.Lista;
  }

  constructor(private itemService: ItemService, private categoriaService: CategoriaService) { }
}
