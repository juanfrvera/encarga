import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ItemCategoria } from "./entities/item-categoria.entity";

export abstract class ItemCategoriaStorage {
    public abstract create(itemId: string, categoriaId: string, order: number, transaction?: TransactionProxy)
        : Promise<ItemCategoria>;

    public abstract deleteById(id: string, transaction?: TransactionProxy): Promise<void>;

    public abstract deleteByCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<void>;

    public abstract deleteByItemId(itemId: string, transaction?: TransactionProxy): Promise<void>;

    public abstract existWithItemIdAndCategoriaId(itemId: string, categoriaId: string): Promise<boolean>;

    public abstract getListByCategoriaId(categoriaId, transaction?: TransactionProxy): Promise<Array<ItemCategoria>>;

    public abstract getListByCategoriaIdListOrderByOrder(categoriaIdList: string[]): Promise<Array<ItemCategoria>>;

    public abstract getListByItemId(itemId: string, transaction?: TransactionProxy): Promise<Array<ItemCategoria>>;

    public abstract getMinimumOrderByCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<number>;

    public abstract itemHasCategoria(itemId: string, transaction: TransactionProxy): Promise<boolean>;
}