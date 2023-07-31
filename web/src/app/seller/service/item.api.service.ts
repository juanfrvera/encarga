import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemData } from "src/app/cliente/data/item.data";
import { ApiService } from "./api.service";
import { ItemCreateData } from "../data/item.create.data";

@Injectable()
export class ItemApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/items`

    public getList() {
        return this.httpClient.get<Array<ItemData>>(this.path);
    }

    public get(id: string) {
        return this.httpClient.get<ItemData>(`${this.path}/item?id=${id}`);
    }

    public create(data: ItemCreateData) {
        // TODO: backend POST request
    }

    public update(data: any) {
        // TODO: backend PUT request
    }

    public delete(id: string) {
        // TODO: backend DELETE request
    }
}