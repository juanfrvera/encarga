import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemLightDto } from "../dto/item.light.dto";
import { ApiService } from "./api.service";

@Injectable()
export class ItemService {
    private readonly endpoint = 'item/';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public getListByCategoriaId(categoriaId: string): Observable<Array<ItemLightDto>> {
        return this.httpClient.get<Array<ItemLightDto>>(
            this.apiService.Url + this.endpoint + 'categoria/', {
            params: { categoriaId }
        });
    }

    public getListByIdList(idList: Array<string>): Observable<Array<ItemLightDto>> {
        return this.httpClient.post<Array<ItemLightDto>>(
            this.apiService.Url + this.endpoint + 'idList', idList);
    }
}