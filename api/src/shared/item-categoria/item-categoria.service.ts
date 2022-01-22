import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { ItemCategoria } from './entities/item-categoria.entity';
import { ItemCategoriaStorage } from './item-categoria.storage';

@Injectable()
export class ItemCategoriaService {
    constructor(
        private readonly storage: ItemCategoriaStorage
    ) { }

    public async create(
        itemId: string, categoriaId: string, order: number, transaction?: TransactionProxy): Promise<ItemCategoria> {
        return this.storage.create(itemId, categoriaId, order, transaction);
    }

    public async createWithMinimumOrder(
        itemId: string, categoriaId: string, transaction?: TransactionProxy): Promise<ItemCategoria> {

        const minimumOrder = await this.getMinimumOrderForCategoriaId(categoriaId, transaction);

        let order = minimumOrder;

        if (minimumOrder > Number.MIN_SAFE_INTEGER) {
            // Put the added item at the start of the categoria
            order--;
        }

        return this.create(itemId, categoriaId, order, transaction);
    }

    public getListByCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<Array<ItemCategoria>> {
        return this.storage.getListByCategoriaId(categoriaId, transaction);
    }

    public getListByCategoriaIdList(categoriaIdList: string[]): Promise<Array<ItemCategoria>> {
        return this.storage.getListByCategoriaIdListOrderByOrder(categoriaIdList);
    }

    public getListByItemId(itemId: string, transaction?: TransactionProxy): Promise<Array<ItemCategoria>> {
        return this.storage.getListByItemId(itemId, transaction);
    }

    public getMinimumOrderForCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<number> {
        return this.storage.getMinimumOrderByCategoriaId(categoriaId, transaction);
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

    public itemHasCategoria(itemId: string, transaction: TransactionProxy): Promise<boolean> {
        return this.storage.itemHasCategoria(itemId, transaction);
    }
}
