import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Shop, ShopData } from "../data/shop/shop.data";
import { ShopCreateData } from "../data/shop/shop.create.data";
import { ShopLite } from "../data/shop/shop-lite.data";

@Injectable()
export class ShopApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/shops`

    public get(id: string) {
        return this.httpClient.get<Shop>(`${this.path}/${id}`).toPromise();
    }

    public create(data: ShopCreateData) {
        return this.httpClient.post<ShopLite>(this.path, data).toPromise();
    }

    public update(id: string, data: Partial<ShopData>) {
        return this.httpClient.patch<ShopLite>(`${this.path}/${id}`, data).toPromise();
    }
}