import { NgModule } from "@angular/core";
import { CategoriaApi } from "./category.api";
import { CategoryFacade } from "./category.facade";
import { CategoriaState } from "./category.state";

@NgModule({
    providers: [
        CategoriaApi,
        CategoriaState,
        CategoryFacade,
    ],
})
export class CategoriaModule { }