import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { Repository } from 'typeorm';
import { ItemFilter } from './data/item-filter';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService extends BaseService<Item, CreateItemDto, UpdateItemDto, ItemFilter> {
  constructor(@InjectRepository(Item) readonly itemsRepository: Repository<Item>,
    private readonly categoriasService: CategoriasService,
    private readonly itemCategoriaService: ItemCategoriaService) {
    super(itemsRepository);
  }

  findOne(id: number, relations?: string[]) {
    return super.findOne(id, relations ?? ['itemCategorias']);
  }

  async update(id: number, updateDto: UpdateItemDto) {
    const original = await this.findOne(id);

    original.titulo = updateDto.titulo ?? original.titulo;
    original.descripcion = updateDto.descripcion ?? original.descripcion;
    original.precio = updateDto.precio ?? original.precio;

    if (updateDto.idsCategorias) {
      const categoriasViejas = original.itemCategorias?.map(i => i.categoria);
      const categorias = await this.categoriasService.findAllWithFilter({ ids: updateDto.idsCategorias });

      // Categorías viejas que se mantienen
      const categoriasMantenidas =
        categoriasViejas?.filter(actual => categorias.findIndex(nueva => nueva.id == actual.id) != -1);
      // ItemCategoria viejas que se mantienen
      const itemCategoriasMantenidas = categoriasMantenidas ? original.itemCategorias.filter(i =>
        categoriasMantenidas.findIndex(c => c.id == i.categoria.id) != -1) : [];

      // Todas las categorías que no están en la lista de viejas
      const categoriasNuevas = categoriasViejas ? categorias.filter(c =>
        categoriasViejas.findIndex(vieja => c.id == vieja.id) == -1) : categorias;

      // Se crean itemCategorias nuevas
      const itemCategoriasNuevas = await Promise.all(categoriasNuevas.map(async c => {
        return (await this.itemCategoriaService.create(original, c));
      }));

      // ItemCategorias viejas que no son mantenidas serán eliminadas
      const itemCategoriasEliminar = original.itemCategorias.filter(i =>
        categoriasMantenidas.findIndex(m => m.id == i.categoria.id) == -1);

      // Eliminar item categorias no mantenidas
      for (const itemCat of itemCategoriasEliminar) {
        await this.itemCategoriaService.delete(itemCat);
      }

      original.itemCategorias = [...itemCategoriasMantenidas, ...itemCategoriasNuevas];
    }

    await this.repo.save(original);

    return original;
  }
}
