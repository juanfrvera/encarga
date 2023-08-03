import { NgModule } from "@angular/core";
import { ShopFacade } from "./shop.facade";

@NgModule({
    providers: [
        ShopFacade,
    ],
})
export class ShopModule { }