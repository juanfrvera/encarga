import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaDto } from "../dto/categoria.dto";
import { ApiService } from "../service/api.service";
import { CategoriaLightDto } from "./model/categoria.light.dto";

@Injectable()
export class CategoriaApi {
    private readonly endpoint = 'categoria/'

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public count(): Observable<number> {
        return this.httpClient.get<number>(this.apiService.Url + this.endpoint + 'count');
    }

    public create(data: any): Observable<CategoriaLightDto> {
        return this.httpClient.post<CategoriaLightDto>(this.apiService.Url + this.endpoint, data);
    }
    public deleteById(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.apiService.Url + this.endpoint + id);
    }
    public getById(id: string): Observable<CategoriaDto> {
        return this.httpClient.get<CategoriaDto>(this.apiService.Url + this.endpoint + id);
    }
    public getList(): Observable<Array<CategoriaLightDto>> {
        return this.httpClient.get<Array<CategoriaLightDto>>(this.apiService.Url + this.endpoint);
    }
    public update(data: any): Observable<CategoriaLightDto> {
        return this.httpClient.patch<CategoriaLightDto>(this.apiService.Url + this.endpoint, data);
    }
}