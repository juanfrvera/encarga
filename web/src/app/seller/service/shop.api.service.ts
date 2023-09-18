import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Shop, ShopData } from "../data/shop/shop.data";
import { ShopCreateData } from "../data/shop/shop.create.data";
import { ShopLite } from "../data/shop/shop-lite.data";
import { AuthData } from "../data/auth/auth-data.dto";
import { tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { ShopService } from "./shop.service";


@Injectable()
export class ShopApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
        private readonly shopService: ShopService
    ) { }

    private readonly path = `${this.apiService.Url}/shops`

    public get(id: string) {
        return this.httpClient.get<Shop>(`${this.path}/${id}`).toPromise();
    }

    public create(data: ShopCreateData) {
        return this.httpClient.post<AuthData>(this.path, data).pipe(
            tap(data => {
                // Saving token and expiration to local storage
                this.authService.setLocalAuthInfo(data);
                // saving shoplist to local storage
                this.shopService.setList(data.shopList);
            })
        ).toPromise()
    }

    public update(id: string, data: Partial<ShopData>) {
        return this.httpClient.patch<ShopLite>(`${this.path}/${id}`, data).pipe(
            tap(data => {
                // saving shoplist to local storage
                let shopList: ShopLite[] = [];
                shopList.push(data);
                this.shopService.setList(shopList);
            })
        ).toPromise();
    }
}