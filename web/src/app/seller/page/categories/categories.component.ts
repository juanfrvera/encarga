import { Component } from '@angular/core';
import { CategoryFacade } from '../../feature/category/category.facade';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriaComponent {
  constructor(
    public service: CategoryFacade
  ) { }

}
