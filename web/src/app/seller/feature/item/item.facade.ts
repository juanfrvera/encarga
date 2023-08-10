import { Injectable } from "@angular/core";
import { ICrudable } from "../../service/interface/crudable.interface";
import { ItemApiService } from "../../service/item.api.service";
import { ItemLite } from "../../data/item/item-lite.data";
import { ItemCreateData } from "../../data/item/item.create.data";
import { Item, ItemData } from "../../data/item/item.data";

@Injectable()
export class ItemFacade implements ICrudable<Item, ItemLite> {
    constructor(
        private readonly api: ItemApiService
    ) { }

    public getList() {
        return this.api.getList();
    }

    public get(id: string) {
        const item = this.api.get(id);
        return item;
    }
    
    public create(data: ItemCreateData) {
        return this.api.create(data);
    }

    public update(id: string, data: Partial<ItemData>) {
        return this.api.update(id, data);
    }

    public delete(id: string) {
        return this.api.delete(id);
    }
}