import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ItemCreateData } from "./data/item.create.data";
import { ItemFilter } from "./data/item.filter";
import { ItemUpdateData } from "./data/item.update.data";
import { Item } from "./entities/item.entity";

export abstract class ItemStorage {
    public abstract countByComercio(comercioId: string): Promise<number>;
    public abstract create(data: ItemCreateData, transaction?: TransactionProxy): Promise<Item>;
    public abstract deleteById(id: string, transaction: TransactionProxy): Promise<void>;
    public abstract exists(id: string): Promise<boolean>;
    public abstract get(id: string): Promise<Item>;
    public abstract getList(filter: ItemFilter): Promise<Array<Item>>;
    public abstract getListByComercio(comercioId: string): Promise<Array<Item>>;
    public abstract remove(id: string, transaction?: TransactionProxy): Promise<void>;
    public abstract update(id: string, data: ItemUpdateData): Promise<Item>;
}