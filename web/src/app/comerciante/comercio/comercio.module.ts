import { NgModule } from "@angular/core";
import { ComercioApi } from "./comercio.api";
import { ComercioFacade } from "./comercio.facade";
import { ComercioState } from "./comercio.state";

@NgModule({
    providers: [
        ComercioApi,
        ComercioState,
        ComercioFacade
    ]
})
export class ComercioModule { }