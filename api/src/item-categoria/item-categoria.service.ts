import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { ItemCategoria } from './entities/item-categoria.entity';
import { ItemCategoriaStorage } from './item-categoria.storage';

@Injectable()
export class ItemCategoriaService {
    constructor(
        private readonly storage: ItemCategoriaStorage
    ) { }

    public async create(itemId: string, categoriaId: string, order: number, transaction?: TransactionProxy): Promise<ItemCategoria> {
        return this.storage.create(itemId, categoriaId, order, transaction);
    }

    public getListByCategoriaIdList(categoriaIdList: string[]): Promise<Array<ItemCategoria>> {
        return this.storage.getListByCategoriaIdListOrderByOrder(categoriaIdList);
    }

    public getListByItemId(itemId: string): Promise<Array<ItemCategoria>> {
        return this.storage.getListByItemId(itemId);
    }

    public getMinimumOrderForCategoriaId(categoriaId: string): Promise<number> {
        return this.storage.getMinimumOrderByCategoriaId(categoriaId);
    }

    public isItemFromCategoria(itemId: string, categoriaId: string): Promise<boolean> {
        return this.storage.existWithItemIdAndCategoriaId(itemId, categoriaId);
    }

    public deleteById(id: string, transaction?: TransactionProxy): Promise<void> {
        return this.storage.deleteById(id, transaction);
    }

    public deleteByCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<void> {
        return this.storage.deleteByCategoriaId(categoriaId, transaction);
    }

    public deleteByItemId(itemId: string, transaction?: TransactionProxy): Promise<void> {
        return this.storage.deleteByItemId(itemId, transaction);
    }
}
