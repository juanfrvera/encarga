import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaDto } from "../dto/categoria.dto";
import { ApiService } from "../service/api.service";
import { ICategoryLite } from "./model/category.lite";

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

    public create(data: any): Observable<ICategoryLite> {
        return this.httpClient.post<ICategoryLite>(this.apiService.Url + this.endpoint, data);
    }
    public deleteById(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.apiService.Url + this.endpoint + id);
    }
    public getById(id: string): Observable<CategoriaDto> {
        return this.httpClient.get<CategoriaDto>(this.apiService.Url + this.endpoint + id);
    }
    public getList(): Observable<Array<ICategoryLite>> {
        return this.httpClient.get<Array<ICategoryLite>>(this.apiService.Url + this.endpoint);
    }
    public update(data: any) {
        return this.httpClient.patch<ICategoryLite>(this.apiService.Url + this.endpoint, data).toPromise();
    }
}