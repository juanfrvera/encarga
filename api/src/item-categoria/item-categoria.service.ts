import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Item } from 'src/items/entities/item.entity';
import { Repository } from 'typeorm';
import { ItemCategoria } from './entities/item-categoria.entity';

@Injectable()
export class ItemCategoriaService {
    constructor(@InjectRepository(ItemCategoria) private readonly repo: Repository<ItemCategoria>) { }

    create(item: Item, categoria: Categoria) {
        const entity = {
            item: item,
            categoria: categoria,
            // TODO: asegurar que no sea una operación "dirty"
            // es decir que si se hace desde dos lugares a la vez, que no queden mal los ordenes (duplicados)    
            orden: this.maximoOrden(categoria) + 1
        } as ItemCategoria;

        return this.repo.save(entity);
    }

    maximoOrden(categoria: Categoria) {
        if (categoria.itemCategorias) {
            return Math.max(...categoria.itemCategorias.map(c => c.orden));
        }
        else {
            return 0;
        }
    }

    delete(itemCategoria: ItemCategoria) {
        this.repo.remove(itemCategoria);
    }

    findByCategorias(idsCategorias: number[]) {
        return this.repo
            .createQueryBuilder('itemCategoria')
            .select()
            .leftJoinAndSelect('itemCategoria.item', 'item')
            .leftJoinAndSelect('itemCategoria.categoria', 'categoria')
            .where('categoria.id IN (:...idsCategorias)', { idsCategorias })
            .orderBy('itemCategoria.orden')
            .getMany();
    }
}
