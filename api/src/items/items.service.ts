import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { EntityManager, Repository } from 'typeorm';
import { ItemFilter } from './data/item-filter';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService extends BaseService<Item, CreateItemDto, ItemFilter> {
  constructor(@InjectRepository(Item) readonly itemsRepository: Repository<Item>,
    private readonly categoriasService: CategoriasService,
    private readonly itemCategoriaService: ItemCategoriaService) {
    super(itemsRepository);
  }

  async create(createDto: CreateItemDto, manager?: EntityManager) {
    const _create = async (mng: EntityManager) => {
      const preItem = new Item();
      preItem.titulo = createDto.titulo;
      preItem.precio = createDto.precio;
      preItem.descripcion = createDto.descripcion;

      // Guardar para obtener un id
      const item = await mng.save(preItem);

      if (createDto.idsCategorias) {
        await this.asignarCategorias(item, createDto.idsCategorias, mng);
      }

      return mng.save(item);
    };


    if (manager) {
      return _create(manager);
    }
    else {
      // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
      // Si falla, se cancela la transaccion y no queda guardado el item
      return this.repo.manager.transaction(myManager => {
        return _create(myManager);
      });
    }
  }

  /**
   * 
   * @param id de entidad buscada
   * @param relations Relaciones a cargar
   * @param manager Usado en transacciones
   * @returns 
   */
  findOne(id: number, relations?: string[], manager?: EntityManager) {
    return super.findOne(id, relations ?? ['itemCategorias'], manager);
  }

  /**
   * 
   * @param id de entidad buscada
   * @param relations Relaciones a cargar
   * @param manager Usado en transacciones
   * @returns 
   */
  findOneOrFail(id: number, relations?: string[], manager?: EntityManager) {
    return super.findOneOrFail(id, relations ?? ['itemCategorias'], manager);
  }

  async update(id: number, updateDto: UpdateItemDto) {
    // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
    // Si falla, se cancela la transaccion y no queda guardado el item
    return this.repo.manager.transaction(async manager => {
      const original = await this.findOneOrFail(id, undefined, manager);

      original.titulo = updateDto.titulo ?? original.titulo;
      original.descripcion = updateDto.descripcion ?? original.descripcion;
      original.precio = updateDto.precio ?? original.precio;

      if (updateDto.idsCategorias) {
        await this.asignarCategorias(original, updateDto.idsCategorias, manager);
      }

      await manager.save(original);

      return original;
    });
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

  private async asignarCategorias(item: Item, idsCategorias: number[], manager?: EntityManager) {
    const categoriasViejas = item.itemCategorias?.map(i => i.categoria);
    const categorias = await this.categoriasService.findAllWithFilter({ ids: idsCategorias }, manager);

    // Categorías viejas que se mantienen
    const categoriasMantenidas =
      categoriasViejas?.filter(actual => categorias.findIndex(nueva => nueva.id == actual.id) != -1);

    // ItemCategoria viejas que se mantienen
    const itemCategoriasMantenidas = categoriasMantenidas ? item.itemCategorias.filter(i =>
      categoriasMantenidas.findIndex(c => c.id == i.categoria.id) != -1) : [];

    // Todas las categorías que no están en la lista de viejas
    const categoriasNuevas = categoriasViejas ? categorias.filter(c =>
      categoriasViejas.findIndex(vieja => c.id == vieja.id) == -1) : categorias;

    // Se crean itemCategorias nuevas
    const itemCategoriasNuevas = await Promise.all(categoriasNuevas.map(async c => {
      return (await this.itemCategoriaService.create(item, c, manager));
    }));

    // ItemCategorias viejas que no son mantenidas serán eliminadas
    const itemCategoriasEliminar = item.itemCategorias?.filter(i =>
      categoriasMantenidas.findIndex(m => m.id == i.categoria.id) == -1);

    if (itemCategoriasEliminar) {
      // Eliminar item categorias no mantenidas
      for (const itemCat of itemCategoriasEliminar) {
        await this.itemCategoriaService.remove(itemCat, manager);
      }
    }

    item.itemCategorias = [...itemCategoriasMantenidas, ...itemCategoriasNuevas];
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
}
