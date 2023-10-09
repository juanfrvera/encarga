import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { CategoryLite } from "../data/category/category-lite.data";

/** Servicio de categorias utilizado por el actor Visita */
@Injectable()
export class CategoryService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/categories`

    public getList() {
        return this.httpClient.get<CategoryLite[]>(`${this.path}`).toPromise();
    }

    public count() {
        return this.httpClient.get<number>(`${this.path}/count`).toPromise();
    }
}