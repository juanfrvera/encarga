import { Component } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoriaListDto } from 'src/app/data/categoria/categoria-list.dto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ItemAdminService } from 'src/app/service/item-admin.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  private categorias: CategoriaListDto[];

  public get Categorias() {
    if (!this.categorias) {
      return this.categoriaService.getAll().pipe(
        tap(lista => this.categorias = lista)
      );
    }
    else {
      return of(this.categorias);
    }
  }

  public get Service() {
    return this.service;
  }

  constructor(private service: ItemAdminService, private categoriaService: CategoriaService) { }
}
