import { Injectable } from '@nestjs/common';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { EntityManager } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item.filter';
import { ItemCreationData } from './data/item.creation.data';
import { ItemStorage } from './storage/item.storage';
import { ItemUpdateData } from './data/item.update.data';
import { ItemNotFoundError } from './error/item-not-found.error';
import { UsuarioComercioService } from 'src/usuario-comercio/usuario-comercio.service';
import { Util } from 'src/util';

@Injectable()
export class ItemService {
  constructor(
    private readonly storage: ItemStorage,
    private readonly itemCategoriaService: ItemCategoriaService,
    private readonly usuarioComercioService: UsuarioComercioService
  ) { }

  public async create(data: ItemCreationData, usuarioId: string) {
    const comercio = await this.usuarioComercioService.getComercioByUsuario(usuarioId);
    const idCategoriaDefecto = comercio.categoriaDefaultId;

    if (data.categoriaIdList && data.categoriaIdList.length) {
      await this.validateCategoriaList(comercio.id, data.categoriaIdList, idCategoriaDefecto);
    }
    else {
      // Si queda huerfano, agregarlo a la categoría defecto
      data.categoriaIdList = [idCategoriaDefecto];
    }

    return this.storage.create(data);
  }

  public async getById(id: string){
    if(await this.storage.exists(id)){
      return this.storage.get(id);
    }
    else{
      throw new ItemNotFoundError();
    }
  }

  public async update(id: string, data: ItemUpdateData, usuarioId: string) {
    if(!this.storage.exists(id)) throw new ItemNotFoundError();

    const comercio = await this.usuarioComercioService.getComercioByUsuario(usuarioId);
    const defaultCategoryId = comercio.categoriaDefaultId;

    // Solo se retocan las categorías si el patch las trata
    if (data.categoriaIdList) {
      if (data.categoriaIdList.length) {
        await this.validateCategoriaList(comercio.id, data.categoriaIdList, defaultCategoryId);
      }
      // Si se quieren eliminar todas las categorías, dejarlo con la categoría defecto
      else {
        data.categoriaIdList = [defaultCategoryId];
      }
    }

    const entity = this.storage.update(id, data);

    // Se saca la categoría por defecto ya que es transparente para los clientes
    this.removeDefaultCategoria(entity, defaultCategoryId);
  }


  async findAllWithFilter(filter: ItemFilter) {
    let list: Item[] = [];

    if (filter.ids) {
      list = await super.findAllWithFilter(filter);
    }

    if (filter.idsCategorias) {
      const itemCategorias = await this.itemCategoriaService.getListByCategoriaIdList(filter.idsCategorias);

      list = [...list, ...itemCategorias.map(ic => ic.item)];
    }

    return list;
  }

  async remove(id: string) {
    if(this.storage.exists(id)){
      this.storage.remove(id);
    }
    else{
      throw new ItemNotFoundError();
    }
  }

  private removeDefaultCategoria(entity: Item, defaultCategoriaId) {
    if (entity.itemCategoriaList) {
      const indexDefecto = entity.itemCategoriaList.findIndex(
        ic => ic.categoria.id == defaultCategoriaId);

      // Eliminar la categoría por defecto solo si está en la lista
      if (indexDefecto != -1) {
        Util.deleteAt(entity.itemCategoriaList, indexDefecto);
      }
    }

    // No devolver lista si no tiene nada
    if (entity.itemCategoriaList && !entity.itemCategoriaList.length) {
      entity.itemCategoriaList = undefined;
    }
  }

  /**
   * Valida que las categorías sean correctas
   * @param comercioId 
   * @param categoriaIds 
   * @param defaultCategoryId 
   * @returns Categorías + categoría por defecto
   */
   private async validateCategoriaList(comercioId: string, categoriaIds: string[], defaultCategoryId: string) {
    if (categoriaIds.includes(defaultCategoryId)) {
      throw new HttpException('No puede elegir la categoría por defecto', HttpStatus.NOT_ACCEPTABLE);
    }

    const validas = await this.categoriaService.listExistAndBelongsToComercio(categoriaIds, comercioId);

    if (!validas) {
      // Si hay categorías que no son de este comercio, se tira excepción
      throw new HttpException('Categoría desconocida', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
