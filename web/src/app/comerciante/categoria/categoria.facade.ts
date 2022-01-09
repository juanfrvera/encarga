import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Subject } from "src/app/shared/util/subject";
import { ICrudable } from "../service/interface/crudable.interface";
import { CategoriaApi } from "./categoria.api";
import { CategoriaState } from "./categoria.state";
import { CategoriaLightDto } from "./model/categoria.light.dto";

@Injectable()
export class CategoriaFacade implements ICrudable {
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

    public create(data: any): Observable<any> {
        return this.api.create(data).pipe(
            tap(created => this.state.add(created))
        );
    }
    public delete(id: string): Observable<void> {
        return this.api.deleteById(id).pipe(
            tap(() => {
                this.state.deleteById(id);

                this.onDelete.notify({ id });
            })
        );
    }
    public get(id: string): Observable<any> {
        // The item is in the state, return from there
        return of(this.state.getById(id)!);
    }
    public getList$(): Observable<Array<CategoriaLightDto> | undefined> {
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
    public update(data: any): Observable<any> {
        return this.api.update(data).pipe(
            tap(updated => this.state.update(updated))
        );
    }

}