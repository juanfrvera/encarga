import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Item } from 'src/item/entities/item.entity';
import { ItemCategoria } from './entities/item-categoria.entity';
import { ItemCategoriaStorage } from './item-categoria.storage';

@Injectable()
export class ItemCategoriaService {
    constructor(
        private readonly storage: ItemCategoriaStorage
    ) { }

    public create(item: Item, categoria: Categoria, transaction?: TransactionProxy): Promise<ItemCategoria> {
        return this.storage.create(item, categoria,  transaction);
    }

    public getListByCategoriaIdList(categoriaIdList: string[]) : Promise<ItemCategoria[]>{
        return this.storage.getListByCategoriaIdListOrderByOrder(categoriaIdList);
    }

    public remove(itemCategoria: ItemCategoria, transaction?: TransactionProxy) : Promise<void> {
        return this.storage.remove(itemCategoria.id, transaction);
    }

    public removeByCategoria(categoriaId: string, transaction?: TransactionProxy): Promise<void>{
        return this.storage.removeByCategoria(categoriaId, transaction);
    }

    public removeByItem(itemId: string, transaction?: TransactionProxy): Promise<void>{
        return this.storage.removeByItem(itemId, transaction);
    }
}
