import { Injectable } from "@angular/core";
import { ComercioState } from "./comercio.state";

@Injectable()
export class SellerFacade {
    private readonly currentIdKey = 'comercio_current_id';
    private readonly temporalSellerKey = 'temporal_seller';

    constructor(
        private readonly state: ComercioState
    ) { }

    public createTemporalSeller(data: { phone: string; name: string }) {
        localStorage.setItem(this.temporalSellerKey, JSON.stringify(data));
    }

    public isTemporalSeller() {
        const storageString = localStorage.getItem(this.temporalSellerKey);

        if (storageString != null && storageString.length > 0) {
            return true;
        }
        return false;
    }

    public getCurrentId$() {
        return this.state.getCurrentId$();
    }

    public getCurrentId() {
        return this.state.getCurrentId();
    }

    public loadCurrentId() {
        const currentId = localStorage.getItem(this.currentIdKey);

        if (currentId) {
            this.state.setCurrentId(currentId);
        }
    }

    public setCurrentId(currentId: string) {
        this.state.setCurrentId(currentId);

        localStorage.setItem(this.currentIdKey, currentId);
    }
}