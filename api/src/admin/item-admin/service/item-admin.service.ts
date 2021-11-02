import { ItemCreateData } from "./service-data/item-create.data";
import { ItemData } from "./service-data/item-data";

export abstract class ItemAdminService {
    public abstract all(urlComercio: string): Promise<ItemData[]>;

    public abstract count(urlComercio: string): Promise<number>;

    public abstract create(creationData: ItemCreateData): Promise<ItemData>;
}