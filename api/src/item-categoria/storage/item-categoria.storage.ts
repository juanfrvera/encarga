import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Item } from "src/item/entities/item.entity";
import { ItemCategoria } from "../entities/item-categoria.entity";

export abstract class ItemCategoriaStorage{
    public abstract create(item: Item, categoria: Categoria, transaction?: TransactionProxy)
    :Promise<ItemCategoria>;

    public abstract getListByCategoriaIdListOrderByOrder(categoriaIdList: string[]): Promise<ItemCategoria[]>;

    public abstract remove(id: string, transaction?: TransactionProxy): Promise<void>;
}