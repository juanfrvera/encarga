import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { ItemDto } from "../../dto/item.dto";
import { ItemLightDto } from "../../dto/item.light.dto";
import { ICrudable } from "../../service/interface/crudable.interface";
import { ItemApi } from "./item.api";
import { ItemState } from "./item.state";

@Injectable()
export class ItemFacade implements ICrudable {
    private loadingList = false;

    constructor(
        private readonly api: ItemApi,
        private readonly state: ItemState
    ) { }

    public create(data: any): Observable<ItemLightDto> {
        return this.api.create(data).pipe(
            tap(created => this.state.add(created))
        );
    }

    public delete(id: string): Observable<void> {
        return this.api.delete(id).pipe(
            tap(() => this.state.delete(id))
        );
    }

    public get(id: string): Observable<ItemDto> {
        if (this.state.hasFullItem(id)) {
            // The item is in the state, return from there
            return of(this.state.getFull(id)!);
        }
        else {
            // Return from the api and add that item to the state
            return this.api.get(id).pipe(
                tap(fullItem => this.state.addFull(fullItem))
            );
        }
    }

    public getList$(): Observable<Array<ItemLightDto> | undefined> {
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

    public update(data: any): Observable<ItemLightDto> {
        return this.api.update(data).pipe(
            tap(updated => this.state.update(updated))
        );
    }
}