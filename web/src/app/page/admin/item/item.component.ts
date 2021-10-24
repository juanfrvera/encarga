import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemAdminService } from 'src/app/service/item-admin.service';

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

  constructor(private itemService: ItemAdminService, private categoriaService: CategoriaService) { }
}
