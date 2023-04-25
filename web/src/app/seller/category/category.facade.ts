import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Subject } from "src/app/shared/util/subject";
import { ICrudable } from "../service/interface/crudable.interface";
import { CategoriaApi } from "./category.api";
import { CategoriaState } from "./category.state";
import { ICategoryLite } from "./model/category.lite";

@Injectable()
export class CategoryFacade implements ICrudable {
    private loadingList = false;
    private onDelete = new Subject<{ id: string }>();

    public get OnDelete() {
        return this.onDelete;
    }

    constructor(
        private readonly api: CategoriaApi,
        private readonly state: CategoriaState
    ) { }

    public count(): Observable<number> {
        if (!this.state.hasCount()) {
            return this.api.count().pipe(
                tap(count => {
                    this.state.setCount(count)
                })
            );
        }
        else {
            return of(this.state.getCount()!);
        }
    }

    public async create(data: any) {
        const created = await this.api.create(data);

        await this.state.add(created);

        return created;
    }
    public async delete(id: string) {
        await this.api.deleteById(id);

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
                this.api.getList().subscribe(
                    list => {
                        // Save to state
                        this.state.setList(list);
                    },
                    error => console.error(error),
                    () => this.loadingList = false
                );
            }
        }

        return this.state.getList$();
    }

    public getList(): Promise<Array<ICategoryLite>> {
        return new Promise((resolve) => this.api.getList().subscribe(resolve));
    }

    public async update(data: any) {
        const updated = await this.api.update(data);
        await this.state.update(updated);
    }

}