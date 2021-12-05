import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../service/api.service";
import { ComercioLightDto } from "./model/comercio.light.dto";

@Injectable()
export class ComercioApi {
    private readonly endpoint = 'comercio/'

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public getList(): Observable<Array<ComercioLightDto>> {
        return this.httpClient.get<Array<ComercioLightDto>>(this.apiService.Url + this.endpoint);
    }
}