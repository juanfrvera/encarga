import { Injectable } from "@angular/core";
import { ShopService } from "../../service/shop.service";

@Injectable()
export class ShopFacade {
    constructor(
        private readonly service: ShopService
    ) { }

    public getList() {
        return this.service.getList();
    }

    
}