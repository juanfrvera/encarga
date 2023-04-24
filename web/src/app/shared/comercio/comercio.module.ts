import { NgModule } from "@angular/core";
import { ComercioApi } from "./comercio.api";
import { SellerFacade } from "./comercio.facade";
import { ComercioState } from "./comercio.state";

@NgModule({
    providers: [
        ComercioApi,
        ComercioState,
        SellerFacade
    ],
})
export class ComercioModule { }