import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICategoryLite } from "./model/category.lite";

@Injectable()
export class CategoriaState {
    private count?: number;
    private list$ = new BehaviorSubject<Array<ICategoryLite> | undefined>(undefined);

    public add(categoria: ICategoryLite) {
        let list = this.list$.value;

        if (list) {
            list.push(categoria);
        }
        else {
            list = [categoria];
        }

        this.list$.next(list);
    }

    public deleteById(id: string) {
        const lightList = this.list$.value;

        if (lightList) {
            if (lightList.find(i => i.id == id)) {
                this.list$.next(lightList.filter(i => i.id != id));
            }
        }
    }

    public getById(id: string) {
        return this.list$.value?.find(i => i.id == id);
    }

    public getList$() {
        return this.list$.asObservable();
    }

    public hasElementWithId(id: string) {
        const list = this.list$.value;

        if (!list) return false;

        return list.find(i => i.id == id) != null
    }

    public hasList() {
        return this.list$.value != undefined;
    }

    public setCount(newCount: number) {
        this.count = newCount;
    }

    public setList(list: Array<ICategoryLite>) {
        this.list$.next(list);
    }

    public update(updatedItem: ICategoryLite) {
        const list = this.list$.value;

        if (list) {
            const index = list.findIndex(i => i.id == updatedItem.id);

            if (index >= 0) {
                list[index] = updatedItem;

                this.list$.next(list);
            }
        }
    }
}