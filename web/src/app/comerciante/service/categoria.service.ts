import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaDto } from "../dto/categoria.dto";
import { CategoriaLightDto } from "../dto/categoria.light.dto";
import { ApiService } from "./api.service";
import { ICrudable } from "./interface/crudable.interface";

@Injectable()
export class CategoriaService implements ICrudable {
    private readonly endpoint = 'categoria/'

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public create(data: any): Observable<CategoriaLightDto> {
        return this.httpClient.post<CategoriaLightDto>(this.apiService.Url + this.endpoint, data);
    }
    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.apiService.Url + this.endpoint + id);
    }
    public get(id: string): Observable<CategoriaDto> {
        return this.httpClient.get<CategoriaDto>(this.apiService.Url + this.endpoint + id);
    }
    public getList$(): Observable<Array<CategoriaLightDto>> {
        return this.httpClient.get<Array<CategoriaLightDto>>(this.apiService.Url + this.endpoint);
    }
    public update(data: any): Observable<CategoriaLightDto> {
        return this.httpClient.put<CategoriaLightDto>(this.apiService.Url + this.endpoint, data);
    }
}