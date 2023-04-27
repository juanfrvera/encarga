import { Injectable } from "@angular/core";
import { CategoryFacade } from "../../category/category.facade";
import { ItemCreateData } from "../../data/item.create.data";
import { IItemLite } from "../../dto/item.lite";
import { ICrudable } from "../../service/interface/crudable.interface";
import { ItemState } from "./item.state";
import { FakeApi } from "src/app/shared/util/fake.api";

@Injectable()
export class ItemFacade implements ICrudable {
    private loadingList = false;
    private api = new FakeApi("item");

    constructor(
        private readonly state: ItemState,
        private readonly categoriaFacade: CategoryFacade
    ) {
        this.categoriaFacade.OnDelete.subscribe((data: any) => this._categoriaDeleted(data));
    }

    public count() {
        return this.api.getTotalCount();
    }

    public async create(data: ItemCreateData) {
        const created = await this.api.create(data);

        await this.state.add(created);

        return created;
    }

    public async delete(id: string) {
        await this.api.delete(id);
        await this.state.delete(id);
    }

    public async get(id: string) {
        if (this.state.hasFullItem(id)) {
            // The item is in the state, return from there
            return this.state.getFull(id)!;
        }
        else {
            // Return from the api and add that item to the state
            const item = await this.api.get(id);

            this.state.addFull(item);

            return item;
        }
    }

    public async getList(): Promise<Array<IItemLite>> {
        return this.api.getList();
    }

    public async update(data: any) {
        const updated = await this.api.update(data);

        this.state.update(updated);
    }

    private _categoriaDeleted({ id }: { id: string }) {
        this.state.deleteFromFullListByCategoriaId(id);
    }
}