import { Injectable } from "@angular/core";
import { ShopService } from "../../service/shop.service";
import { ShopApiService } from "../../service/shop.api.service";
import { ShopCreateData } from "../../data/shop/shop.create.data";
import { ShopData } from "../../data/shop/shop.data";
import { Subject } from "rxjs";
import { ShopLite } from "../../data/shop/shop-lite.data";

@Injectable()
export class ShopFacade {

    public channel = new Subject<ShopChannel.Signal>();

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

    public async create(data: ShopCreateData) {
        const response = await this.apiService.create(data);
        this.channel.next({ type: 'shopListUpdated', data: { shops: response.shopList } });
        return response;
    }

    public async update(id: string, data: Partial<ShopData>) {
        const response = await this.apiService.update(id, data);
        this.channel.next({ type: 'shopUpdated', data: { shop: response } })
        return response;
    }

}

namespace ShopChannel {
    export type Signal = IShopListUpdatedSignal | IShopUpdatedSignal;

    interface IShopListUpdatedSignal {
        type: 'shopListUpdated';
        data: { shops: ShopLite[] };
    }

    interface IShopUpdatedSignal {
        type: 'shopUpdated';
        data: { shop: ShopLite }
    }
}