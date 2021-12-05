import { Injectable } from "@angular/core";
import { ComercioApi } from "./comercio.api";
import { ComercioState } from "./comercio.state";
import { ComercioLightDto } from "./model/comercio.light.dto";

@Injectable()
export class ComercioFacade {
    constructor(
        private readonly api: ComercioApi,
        private readonly state: ComercioState
    ) { }

    public getCurrent$() {
        return this.state.getCurrent$();
    }

    public getList$() {
        return this.state.getList$();
    }

    public loadList() {
        this.api.getList().subscribe(
            (list) => this.state.setList(list),
            (error) => console.error(error)
        );
    }

    public setCurrent(current: ComercioLightDto) {
        this.state.setCurrent(current);
    }
}