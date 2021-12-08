import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ItemDto } from "../../dto/item.dto";
import { ItemLightDto } from "../../dto/item.light.dto";

@Injectable()
export class ItemState {
    private lightList$ = new BehaviorSubject<Array<ItemLightDto> | undefined>(undefined);
    private fullList$ = new BehaviorSubject<Array<ItemDto> | undefined>(undefined);

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

    public hasFullItem(itemId: string) {
        const list = this.fullList$.value;

        if (!list) return false;

        return list.find(i => i.id == itemId) != null
    }

    public hasList() {
        return this.lightList$.value != undefined;
    }

    public delete(itemId: string) {
        const lightList = this.lightList$.value;

        if (lightList) {
            if (lightList.find(i => i.id == itemId)) {
                this.lightList$.next(lightList.filter(i => i.id != itemId));
            }
        }

        this.deleteFull(itemId);
    }

    public getFull(itemId: string) {
        return this.fullList$.value?.find(i => i.id == itemId);
    }

    public getList$() {
        return this.lightList$.asObservable();
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
        this.deleteFull(updatedItem.id);
    }

    public setList(list: Array<ItemLightDto>) {
        this.lightList$.next(list);
    }

    private deleteFull(itemId: string) {
        const fullList = this.fullList$.value;

        if (fullList) {
            if (fullList.find(i => i.id == itemId)) {
                this.fullList$.next(fullList.filter(i => i.id != itemId));
            }
        }
    }

}