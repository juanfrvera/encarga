import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  public get Service() {
    return this.itemService;
  }

  public get Categorias() {
    return this.categoriaService.Items;
  }

  constructor(private itemService: ItemService, private categoriaService: CategoriaService) { }
}
