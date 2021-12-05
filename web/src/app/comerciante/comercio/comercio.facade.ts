import { Injectable } from "@angular/core";
import { ComercioApi } from "./comercio.api";
import { ComercioState } from "./comercio.state";

@Injectable()
export class ComercioFacade {
    private readonly currentIdKey = 'comercio_current_id';

    constructor(
        private readonly api: ComercioApi,
        private readonly state: ComercioState
    ) { }

    public getCurrentId$() {
        return this.state.getCurrentId$();
    }

    public getCurrentId() {
        return this.state.getCurrentId();
    }

    public getList$() {
        return this.state.getList$();
    }

    public loadCurrentId() {
        const currentId = localStorage.getItem(this.currentIdKey);

        if (currentId) {
            this.state.setCurrentId(currentId);
        }
    }

    public loadList() {
        this.api.getList().subscribe(
            (list) => this.state.setList(list),
            (error) => console.error(error)
        );
    }

    public setCurrentId(currentId: string) {
        this.state.setCurrentId(currentId);

        localStorage.setItem(this.currentIdKey, currentId);
    }
}