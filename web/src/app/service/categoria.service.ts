import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaFilter } from '../data/categoria/categoria-filter';
import { CategoriaListDto } from '../data/categoria/categoria-list.dto';
import { ApiService } from './instance/api.service';
import { CrudService } from './instance/crud.service';
import { Categoria } from '../data/categoria/categoria';
import { ICategoria } from '../data/categoria/categoria.dto';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria, ICategoria, CategoriaListDto, CategoriaFilter> {
  constructor(
    readonly http: HttpClient,
    private readonly itemService: ItemService) {
    super(http, 'categorias/');
  }

  public getAll() {
    let path = ApiService.Url + this.Route;

    return this.http.get<CategoriaListDto[]>(path);
  }

  public getWithFilter(filter: CategoriaFilter) {
    let path = ApiService.Url + this.Route + 'filter';

    return this.http.post<CategoriaListDto[]>(path, filter);
  }

  /**
   * Devuelve los items de una categoría
   * @param idCategoria 
   * @returns 
   */
  public getItems(idCategoria: string) {
    return this.itemService.getWithFilter({ idsCategorias: [idCategoria] });
  }
}
