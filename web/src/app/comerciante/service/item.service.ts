import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemCreateData } from "../data/item.create.data";
import { ItemUpdateData } from "../data/item.update.data";
import { ItemDto } from "../dto/item.dto";
import { ItemLightDto } from "../dto/item.light.dto";
import { ApiService } from "./api.service";
import { ICrudable } from "./interface/crudable.interface";

@Injectable()
export class ItemService implements ICrudable {
    private readonly endpoint = 'item/';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public create(data: ItemCreateData): Observable<ItemLightDto> {
        return this.httpClient.post<ItemLightDto>(this.apiService.Url + this.endpoint, data);
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

    public getList(): Observable<Array<ItemLightDto>> {
        return this.httpClient.get<Array<ItemLightDto>>(this.apiService.Url + this.endpoint);
    }

    public update(data: ItemUpdateData): Observable<ItemLightDto> {
        return this.httpClient.put<ItemLightDto>(this.apiService.Url + this.endpoint, data);
    }
}