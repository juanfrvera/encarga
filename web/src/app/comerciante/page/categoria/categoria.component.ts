import { Component } from '@angular/core';
import { CategoriaFacade } from '../../categoria/categoria.facade';

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
    private readonly facade: CategoriaFacade
  ) { }

}
