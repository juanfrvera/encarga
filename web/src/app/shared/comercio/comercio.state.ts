import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ComercioLightDto } from "./model/comercio.light.dto";

@Injectable()
export class ComercioState {
    private current$ = new BehaviorSubject<string | null>(null);

    public getCurrentId$() {
        return this.current$.asObservable();
    }

    public getCurrentId() {
        return this.current$.value;
    }

    public setCurrentId(current: string) {
        this.current$.next(current);
    }
}