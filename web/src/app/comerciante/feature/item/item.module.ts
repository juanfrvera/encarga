import { NgModule } from "@angular/core";
import { ItemApi } from "./item.api";
import { ItemFacade } from "./item.facade";
import { ItemState } from "./item.state";

@NgModule({
    providers: [
        ItemApi,
        ItemFacade,
        ItemState
    ]
})
export class ItemModule { }