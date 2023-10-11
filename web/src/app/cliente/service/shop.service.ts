import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { CategoryLite } from "../data/category/category-lite.data";

@Injectable()
export class ShopService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/shops`

    public getShopNameByPath() {
        return this.httpClient.get<string>(`${this.path}/name`).toPromise();
    }
}