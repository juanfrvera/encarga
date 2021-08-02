import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaFilter } from '../data/categoria/categoria-filter';
import { CategoriaList } from '../data/categoria/categoria-list';
import { ApiService } from './instance/api.service';
import { CrudService } from './instance/crud.service';
import { Categoria } from '../data/categoria/categoria';
import { ICategoria } from '../data/categoria/categoria.dto';
import { ItemService } from './item.service';
import { Item } from '../data/item/item';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria, ICategoria, CategoriaList, CategoriaFilter> {
  constructor(http: HttpClient, private itemService: ItemService) {
    super(new ApiService(http, 'categorias/'));

    // Suscribirse a la actualización de un item para cambiar las categorías localmente
    itemService.OnItemUpdate.subscribe(datos => {
      this.aplicarCambioDeCategorias(datos.nuevo, datos.viejo);
    });
  }

  /**
   * Devuelve los items de una categoría
   * @param idCategoria 
   * @returns 
   */
  public getItems(idCategoria: string) {
    return this.itemService.getWithFilter({ idsCategorias: [idCategoria] });
  }

  protected fromDto(dto: ICategoria) {
    return Categoria.fromDto(dto, this);
  }
  protected fromListDto(dto: CategoriaList) {
    return Categoria.fromListDto(dto, this);
  }
  protected toDto(entity: Categoria) {
    return Categoria.toDto(entity);
  }

  /** Informa al servicio categoria sobre los cambios de categorias */
  private aplicarCambioDeCategorias(nuevo: Item, viejo?: Item) {
    const viejas = viejo?.idsCategorias;
    const guardadas = nuevo.idsCategorias;

    const eliminadas = viejas?.filter(v => !guardadas?.find(g => g == v));
    const nuevas = guardadas?.filter(g => !viejas?.find(v => v == g));

    if (eliminadas || nuevas) {
      this.itemCambioCategorias(nuevo, nuevas, eliminadas);
    }
  }

  // Cuando un item cambió de categorías
  private itemCambioCategorias(item: Item, idsNuevas?: string[], idsEliminadas?: string[]) {
    const lista = this.lista.value;

    // Si la lista de categorías existe localmente (fue pedida al servidor)
    if (lista) {
      // Eliminar de las categorías en que fue eliminado
      lista.filter(cat => !!idsEliminadas?.find(e => e == cat.id)).forEach(cat => cat.itemEliminado(item));

      // Agregar item a categorías nuevas localmente
      lista.filter(cat => !!idsNuevas?.find(n => n == cat.id)).forEach(cat => cat.nuevoItem(item));
    }
  }
}
