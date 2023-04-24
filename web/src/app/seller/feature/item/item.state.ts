import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ItemDto } from "../../dto/item.dto";
import { ItemLightDto } from "../../dto/item.light.dto";

@Injectable()
export class ItemState {
    private count?: number;
    private fullList$ = new BehaviorSubject<Array<ItemDto> | undefined>(undefined);
    private lightList$ = new BehaviorSubject<Array<ItemLightDto> | undefined>(undefined);

    public add(item: ItemLightDto) {
        let list = this.lightList$.value;

        if (list) {
            list.push(item);
        }
        else {
            list = [item];
        }

        this.lightList$.next(list);
    }

    public addFull(item: ItemDto) {
        let list = this.fullList$.value;

        if (list) {
            list.push(item);
        }
        else {
            list = [item];
        }

        this.fullList$.next(list);
    }

    public delete(itemId: string) {
        const lightList = this.lightList$.value;

        if (lightList) {
            if (lightList.find(i => i.id == itemId)) {
                this.lightList$.next(lightList.filter(i => i.id != itemId));
            }
        }

        this.deleteFullById(itemId);
    }

    public deleteFromFullListByCategoriaId(categoriaId: string) {
        const fullList = this.fullList$.value;

        if (fullList) {
            // Keep the items which doesn't contain the categoria
            this.fullList$.next(fullList.filter(item => !item.categoriaIdList?.includes(categoriaId)));
        }
    }

    public hasCount() {
        return this.count != undefined;
    }

    public hasFullItem(itemId: string) {
        const list = this.fullList$.value;

        if (!list) return false;

        return list.find(i => i.id == itemId) != null
    }

    public hasList() {
        return this.lightList$.value != undefined;
    }

    public getCount() {
        return this.count;
    }

    public getFull(itemId: string) {
        return this.fullList$.value?.find(i => i.id == itemId);
    }

    public getList$() {
        return this.lightList$.asObservable();
    }

    public setCount(newCount: number) {
        this.count = newCount;
    }

    public setList(list: Array<ItemLightDto>) {
        this.lightList$.next(list);
    }

    public update(updatedItem: ItemLightDto) {
        const list = this.lightList$.value;

        if (list) {
            const index = list.findIndex(i => i.id == updatedItem.id);

            if (index >= 0) {
                list[index] = updatedItem;

                this.lightList$.next(list);
            }
        }

        // Delete full item because is outdated
        this.deleteFullById(updatedItem.id);
    }

    private deleteFullById(itemId: string) {
        const fullList = this.fullList$.value;

        if (fullList) {
            if (fullList.find(i => i.id == itemId)) {
                this.fullList$.next(fullList.filter(i => i.id != itemId));
            }
        }
    }

}