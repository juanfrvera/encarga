import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComercioLightDto } from "./model/comercio.light.dto";

@Injectable()
export class ComercioApi {
    private readonly url = 'comercio/'

    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    public getList(): Observable<Array<ComercioLightDto>> {
        return this.httpClient.get<Array<ComercioLightDto>>(this.url);
    }
}