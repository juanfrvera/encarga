import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Item } from 'src/items/entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { ItemCategoria } from './entities/item-categoria.entity';

@Injectable()
export class ItemCategoriaService {
    constructor(@InjectRepository(ItemCategoria) private readonly repo: Repository<ItemCategoria>) { }

    /**
     * 
     * @param item 
     * @param categoria 
     * @param manager Usado en caso de que se esté en una transacción
     * @returns 
     */
    create(item: Item, categoria: Categoria, manager?: EntityManager) {
        // TODO: asegurar que el obtener el orden no sea una operación "dirty"
        // es decir que si se hace desde dos lugares a la vez, que no queden mal los ordenes (duplicados)    
        const entity = new ItemCategoria(item, categoria, this.maximoOrden(categoria) + 1);

        if (manager) {
            return manager.save(entity);
        }
        else {
            return this.repo.save(entity);
        }
    }

    maximoOrden(categoria: Categoria) {
        if (categoria.itemCategorias) {
            return Math.max(...categoria.itemCategorias.map(c => c.orden));
        }
        else {
            return 0;
        }
    }


    /**
     * 
     * @param itemCategoria 
     * @param manager usado en caso de transacciones
     */
    delete(itemCategoria: ItemCategoria, manager?: EntityManager) {
        if (manager) {
            return manager.remove(itemCategoria);
        }
        else {
            return this.repo.remove(itemCategoria);
        }
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
