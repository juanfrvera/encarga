import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../data/categoria/categoria';
import { CategoriaFilter } from '../data/categoria/categoria-filter';
import { CategoriaList } from '../data/categoria/categoria-list';
import { ApiService } from './api.service';
import { CrudService } from './instance/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria, CategoriaList, CategoriaFilter> {
  constructor(http: HttpClient) {
    super(new ApiService(http, 'categorias/'));
  }
}
