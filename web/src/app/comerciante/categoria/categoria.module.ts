import { NgModule } from "@angular/core";
import { CategoriaApi } from "./categoria.api";
import { CategoriaFacade } from "./categoria.facade";
import { CategoriaState } from "./categoria.state";

@NgModule({
    providers: [
        CategoriaApi,
        CategoriaState,
        CategoriaFacade,
    ],
})
export class CategoriaModule { }