import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaFilter } from '../data/categoria/categoria-filter';
import { CategoriaList } from '../data/categoria/categoria-list';
import { ApiService } from './api.service';
import { CrudService } from './instance/crud.service';
import { Categoria } from '../data/categoria/categoria';
import { ICategoria } from '../data/categoria/categoria.dto';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria, ICategoria, CategoriaList, CategoriaFilter> {
  constructor(http: HttpClient, private itemService: ItemService) {
    super(new ApiService(http, 'categorias/'));
  }

  fromDto(dto: ICategoria) {
    return Categoria.fromDto(dto);
  }
  fromListDto(dto: CategoriaList) {
    return Categoria.fromListDto(dto, this.itemService);
  }
  toDto(entity: Categoria) {
    return Categoria.toDto(entity);
  }
}
