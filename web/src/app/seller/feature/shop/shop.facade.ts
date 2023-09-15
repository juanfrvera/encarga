import { Injectable } from "@angular/core";
import { ShopService } from "../../service/shop.service";
import { ShopApiService } from "../../service/shop.api.service";
import { ShopCreateData } from "../../data/shop/shop.create.data";
import { ShopData } from "../../data/shop/shop.data";

@Injectable()
export class ShopFacade {
    constructor(
        private readonly service: ShopService,
        private readonly apiService: ShopApiService
    ) { }

    public getList() {
        return this.service.getList();
    }

    public get(id: string) {
        const shop = this.apiService.get(id);
        return shop;
    }
    
    public create(data: ShopCreateData) {
        return this.apiService.create(data);
    }

    public update(id: string, data: Partial<ShopData>) {
        return this.apiService.update(id, data);
    }
    
}