import { Injectable } from '@nestjs/common';
import { CategoriaService } from 'src/categoria/categoria.service';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { EntityManager } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemFilter } from './data/item.filter';
import { ItemCreationData } from './data/item.creation.data';
import { ItemStorage } from './storage/item.storage';
import { ItemUpdateData } from './data/item.update.data';

@Injectable()
export class ItemService {
  constructor(
    private readonly storage: ItemStorage,
    private readonly categoriaService: CategoriaService,
    private readonly itemCategoriaService: ItemCategoriaService
  ) { }

  public async create(data: ItemCreationData) {
    return this.storage.create(data);
  }

  public async update(id: number, data: ItemUpdateData) {

  }


  async findAllWithFilter(filter: ItemFilter) {
    let list: Item[] = [];

    if (filter.ids) {
      list = await super.findAllWithFilter(filter);
    }

    if (filter.idsCategorias) {
      const itemCategorias = await this.itemCategoriaService.findByCategorias(filter.idsCategorias);

      list = [...list, ...itemCategorias.map(ic => ic.item)];
    }

    return list;
  }

  async remove(id: number, manager?: EntityManager) {
    if (manager) {
      // Eliminar clases de asociación
      await this.itemCategoriaService.removeByItemId(id, manager);
      return super.remove(id, manager);
    }
    else {
      return this.repo.manager.transaction(async newManager => {
        // Eliminar clases de asociación
        await this.itemCategoriaService.removeByItemId(id, newManager);
        return super.remove(id, newManager);
      });
    }
  }

  fromCreateDto(dto: CreateItemDto): Item {
    throw new Error('Method not implemented.');
  }

  private getQuery(filter?: ItemFilter) {
    const query = this.repo.createQueryBuilder('item');

    if (filter) {
      if (filter.urlComercio) {
        query.leftJoin('item.itemCategorias', 'itemCategoria')
          .leftJoin('itemCategoria.categoria', 'categoria')
          .leftJoin('categoria.comercio', 'comercio')
          .andWhere('comercio.url = :urlComercio', { urlComercio: filter.urlComercio });
      }
    }

    return query;
  }
}
