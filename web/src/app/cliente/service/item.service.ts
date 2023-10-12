import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { ItemLite } from "../data/item/item-lite.data";

@Injectable()
export class ItemService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/items`

    public getListByCategoryId(categoryId: string) {
        return this.httpClient.get<ItemLite[]>(`${this.path}/by-category/${categoryId}`).toPromise();
    }

    public count(categoryId: string) {
        return this.httpClient.get<number>(`${this.path}/count/by-category/${categoryId}`).toPromise();
    }

    public getOrphanItems() {
        return this.httpClient.get<ItemLite[]>(`${this.path}/orphans`).toPromise();
    }

    public orphanCount() {
        return this.httpClient.get<number>(`${this.path}/count/orphans`).toPromise();
    }

    public getListByIdList(idList: string[]) {
        return this.httpClient.get<ItemLite[]>(`${this.path}?id=${idList}`).toPromise();
    }

}