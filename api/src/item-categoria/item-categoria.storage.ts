import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { Item } from "src/item/entities/item.entity";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ItemCategoria } from "./entities/item-categoria.entity";

export abstract class ItemCategoriaStorage {
    public abstract create(item: Item, categoria: Categoria, transaction?: TransactionProxy)
        : Promise<ItemCategoria>;

    public abstract getListByCategoriaIdListOrderByOrder(categoriaIdList: string[]): Promise<Array<ItemCategoria>>;

    public abstract getListByItemId(itemId: string): Promise<Array<ItemCategoria>>;

    public abstract existWithItemIdAndCategoriaId(itemId: string, categoriaId: string): Promise<boolean>;

    public abstract remove(id: string, transaction?: TransactionProxy): Promise<void>;

    public abstract removeByCategoria(categoriaId: string, transaction?: TransactionProxy): Promise<void>;

    public abstract removeByItem(itemId: string, transaction?: TransactionProxy): Promise<void>;
}