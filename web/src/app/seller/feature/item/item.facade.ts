import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { CategoryFacade } from "../../category/category.facade";
import { ItemCreateData } from "../../data/item.create.data";
import { ItemDto } from "../../dto/item.dto";
import { ItemLightDto } from "../../dto/item.light.dto";
import { ICrudable } from "../../service/interface/crudable.interface";
import { ItemApi } from "./item.api";
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

    public count(): number {
        if (!this.state.hasCount()) {
            return this.api.count();
        }
        else {
            return this.state.getCount()!;
        }
    }

    public create(data: ItemCreateData): Observable<ItemLightDto> {
        const created = this.api.create(data);

        this.state.add(created);

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

    public async getList(): Promise<Array<ItemLightDto>> {
        return this.api.getList();
    }

    public getList$(): Observable<Array<ItemLightDto> | undefined> {
        // Only load list if state hasn't already
        if (!this.state.hasList()) {
            if (!this.loadingList) {
                this.loadingList = true;

                try {
                    // Load from api
                    const list = this.api.getList();

                    // Save to state
                    this.state.setList(list);
                } catch (error) {
                    console.error(error);
                }

                this.loadingList = false
            }
        }

        return this.state.getList$();
    }

    public async update(data: any) {
        const updated = await this.api.update(data);

        this.state.update(updated);
    }

    private _categoriaDeleted({ id }: { id: string }) {
        this.state.deleteFromFullListByCategoriaId(id);
    }
}