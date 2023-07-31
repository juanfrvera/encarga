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
        return this.httpClient.get<Array<ItemData>>(this.path).toPromise();
    }

    public get(id: string) {
        return this.httpClient.get<ItemData>(`${this.path}/item?id=${id}`).toPromise();
    }

    public create(data: ItemCreateData) {
        return this.httpClient.post<ItemCreateData>(this.path, data).toPromise();
    }

    public update(data: any) {
        return this.httpClient.patch<any>(this.path, data).toPromise();
    }

    public delete(id: string) {
        return this.httpClient.delete<any>(`${this.path}/item?id=${id}`).toPromise();
    }
}