import { NgModule } from "@angular/core";
import { ItemFacade } from "./item.facade";

@NgModule({
    providers: [
        ItemFacade,
    ]
})
export class ItemModule { }