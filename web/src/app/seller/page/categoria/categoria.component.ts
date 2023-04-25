import { Component } from '@angular/core';
import { CategoryFacade } from '../../category/category.facade';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  public get Service() {
    return this.facade;
  }

  constructor(
    private readonly facade: CategoryFacade
  ) { }

}
