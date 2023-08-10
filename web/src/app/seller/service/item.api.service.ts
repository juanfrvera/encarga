import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ItemLite } from "../data/item/item-lite.data";
import { Item, ItemData } from "../data/item/item.data";
import { ItemCreateData } from "../data/item/item.create.data";

@Injectable()
export class ItemApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/items`

    public getList() {
        return this.httpClient.get<Array<ItemLite>>(this.path).toPromise();
    }

    public get(id: string) {
        return this.httpClient.get<Item>(`${this.path}/${id}`).toPromise();
    }

    public create(data: ItemCreateData) {
        return this.httpClient.post<ItemLite>(this.path, data).toPromise();
    }

    public update(id: string, data: Partial<ItemData>) {
        return this.httpClient.patch<ItemLite>(`${this.path}/${id}`, data).toPromise();
    }

    public delete(id: string) {
        return this.httpClient.delete<any>(`${this.path}/${id}`).toPromise();
    }
}