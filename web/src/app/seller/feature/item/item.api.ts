import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemCreateData } from "../../data/item.create.data";
import { ItemUpdateData } from "../../data/item.update.data";
import { ItemDto } from "../../dto/item.dto";
import { IItemLite } from "../../dto/item.lite";
import { ApiService } from "../../service/api.service";

@Injectable()
export class ItemApi {
    private readonly endpoint = 'item/';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public create(data: ItemCreateData): Observable<IItemLite> {
        return this.httpClient.post<IItemLite>(this.apiService.Url + this.endpoint, data);
    }

    public count(): Observable<number> {
        return this.httpClient.get<number>(this.apiService.Url + this.endpoint + 'count');
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.apiService.Url + this.endpoint + id);
    }

    public get(id: string): Observable<ItemDto> {
        return this.httpClient.get<ItemDto>(this.apiService.Url + this.endpoint + id);
    }

    public getList(): Observable<Array<IItemLite>> {
        return this.httpClient.get<Array<IItemLite>>(this.apiService.Url + this.endpoint);
    }

    public update(data: ItemUpdateData): Observable<IItemLite> {
        return this.httpClient.patch<IItemLite>(this.apiService.Url + this.endpoint, data);
    }
}