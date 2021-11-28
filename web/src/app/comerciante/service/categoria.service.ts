import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoriaLightDto } from "../dto/categoria.light.dto";
import { ApiService } from "./api.service";

export class CategoriaService {
    private readonly endpoint = 'categoria/'

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public getList(): Observable<Array<CategoriaLightDto>> {
        return this.httpClient.get<Array<CategoriaLightDto>>(this.apiService.Url + this.endpoint);
    }
}