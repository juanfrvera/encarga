import { NgModule } from "@angular/core";
import { CategoryFacade } from "./category.facade";

@NgModule({
    providers: [
        CategoryFacade,
    ],
})
export class CategoryModule { }