import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class ComercioService {
    private readonly endpoint = 'comercio/';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    public getDefaultCategoriaId(): Observable<string> {
        return this.httpClient.get<string>(this.apiService.Url + this.endpoint + 'defaultCategoriaId');
    }
}