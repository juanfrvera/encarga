import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CategoriaLightDto } from "./model/categoria.light.dto";

@Injectable()
export class CategoriaState {
    private list$ = new BehaviorSubject<Array<CategoriaLightDto> | undefined>(undefined);

    public add(categoria: CategoriaLightDto) {
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

    public setList(list: Array<CategoriaLightDto>) {
        this.list$.next(list);
    }

    public update(updatedItem: CategoriaLightDto) {
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