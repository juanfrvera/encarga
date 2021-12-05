import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ComercioLightDto } from "./model/comercio.light.dto";

@Injectable()
export class ComercioState {
    private current$ = new BehaviorSubject<ComercioLightDto | null>(null);
    private list$ = new BehaviorSubject<Array<ComercioLightDto> | null>(null);

    public getCurrent$() {
        return this.current$.asObservable();
    }

    public getList$() {
        return this.list$.asObservable();
    }

    public setCurrent(current: ComercioLightDto) {
        this.current$.next(current);
    }

    public setList(list: Array<ComercioLightDto>) {
        this.list$.next(list);
    }
}