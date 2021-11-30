import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaLightDto } from "../dto/categoria.light.dto";
import { ApiService } from "./api.service";

/** Servicio de categorias utilizado por el actor Visita */
@Injectable()
export class CategoriaService {
    private readonly endpoint = 'categoria/';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public getList(): Observable<Array<CategoriaLightDto>> {
        return this.httpClient.get<Array<CategoriaLightDto>>(this.apiService.Url + this.endpoint);
    }
}