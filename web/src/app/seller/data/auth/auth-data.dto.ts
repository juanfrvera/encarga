import { ShopLite } from "../shop/shop-lite.data";

export class AuthData {
    token: string;
    expiresIn: string;
    shopList: ShopLite[];
}