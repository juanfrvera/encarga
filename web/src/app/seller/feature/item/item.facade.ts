import { Injectable } from "@angular/core";
import { ItemCreateData } from "../../data/item.create.data";
import { ICrudable } from "../../service/interface/crudable.interface";
import { ItemApiService } from "../../service/item.api.service";

@Injectable()
export class ItemFacade implements ICrudable {
    constructor(
        private readonly api: ItemApiService
    ) { }

    public getList() {
        return this.api.getList().toPromise();
    }

    public get(id: string) {
        const item = this.api.get(id).toPromise();
        return item;
    }
    
    public async create(data: ItemCreateData) {
        this.api.create(data);
    }

    public async update(data: any) {
        this.api.update(data);
    }

    public async delete(id: string) {
        this.api.delete(id);
    }
}