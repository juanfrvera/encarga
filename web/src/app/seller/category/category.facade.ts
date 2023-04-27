import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Subject } from "src/app/shared/util/subject";
import { ICrudable } from "../service/interface/crudable.interface";
import { CategoriaState } from "./category.state";
import { ICategoryLite } from "./model/category.lite";
import { FakeApi } from "src/app/shared/util/fake.api";

@Injectable()
export class CategoryFacade implements ICrudable {
    private loadingList = false;
    private onDelete = new Subject<{ id: string }>();

    private api = new FakeApi("category");

    public get OnDelete() {
        return this.onDelete;
    }

    constructor(
        private readonly state: CategoriaState
    ) { }

    public count() {
        return this.api.getTotalCount();
    }

    public async create(data: any) {
        const created = await this.api.create(data);

        await this.state.add(created);

        return created;
    }
    public async delete(id: string) {
        await this.api.delete(id);
        await this.state.deleteById(id);

        this.onDelete.notify({ id });
    }
    public async get(id: string) {
        // The item is in the state, return from there
        return this.state.getById(id)!;
    }
    public getList$(): Observable<Array<ICategoryLite> | undefined> {
        // Only load list if state hasn't already
        if (!this.state.hasList()) {
            if (!this.loadingList) {
                this.loadingList = true;

                // Load from api
                this.api.getList().then((list) => {
                    // Save to state
                    this.state.setList(list);
                })
                    .catch(error => console.error(error))
                    .finally(() => this.loadingList = false);
            }
        }

        return this.state.getList$();
    }

    public getList(): Promise<Array<ICategoryLite>> {
        return this.api.getList();
    }

    public async update(data: any) {
        const updated = await this.api.update(data);
        await this.state.update(updated);
    }

}