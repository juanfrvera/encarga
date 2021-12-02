import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ItemCreationData } from "./data/item.creation.data";
import { ItemFilter } from "./data/item.filter";
import { ItemUpdateData } from "./data/item.update.data";
import { Item } from "./entities/item.entity";

export abstract class ItemStorage {
    public abstract countByComercio(comercioId: string): Promise<number>;
    public abstract create(data: ItemCreationData): Promise<Item>;
    public abstract exists(id: string): Promise<boolean>;
    public abstract get(id: string): Promise<Item>;
    public abstract getList(filter: ItemFilter): Promise<Array<Item>>;
    public abstract getListByComercio(comercioId: string): Promise<Array<Item>>;
    public abstract remove(id: string, transaction?: TransactionProxy): Promise<void>;
    public abstract update(id: string, data: ItemUpdateData): Promise<Item>;
}