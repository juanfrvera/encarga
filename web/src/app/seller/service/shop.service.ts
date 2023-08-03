import { Injectable } from "@angular/core";
import { ShopLite } from "../data/shop/shop-lite.data";

@Injectable()
export class ShopService {
    private readonly shopListKey = "shop_list"

    constructor(
    ) { }

    public getList(): ShopLite[] {
        const storedString = localStorage.getItem(this.shopListKey);
        return storedString ? JSON.parse(storedString) : [];
    }

    public setList(shopList: ShopLite[]) {
        localStorage.setItem(this.shopListKey, JSON.stringify(shopList));
    }
}