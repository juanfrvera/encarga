import { Component } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  public get Service() {
    return this.service;
  }

  constructor(
    private readonly service: CategoriaService
  ) { }

}
