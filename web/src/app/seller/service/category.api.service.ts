import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { CategoryLite } from "../data/category/category-lite.data";
import { Category } from "../data/category/category.data";
import { CategoryCreateData } from "../data/category/category.create.data";

@Injectable()
export class CategoryApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: ApiService
    ) { }

    private readonly path = `${this.apiService.Url}/categories`

    public getList() {
        return this.httpClient.get<Array<CategoryLite>>(this.path).toPromise();
    }

    public get(id: string) {
        return this.httpClient.get<Category>(`${this.path}/category?id=${id}`).toPromise();
    }

    public create(data: CategoryCreateData) {
        return this.httpClient.post<CategoryLite>(this.path, data).toPromise();
    }

    public update(data: CategoryLite) {
        return this.httpClient.patch<CategoryLite>(this.path, data).toPromise();
    }

    public delete(id: string) {
        return this.httpClient.delete<any>(`${this.path}/category?id=${id}`).toPromise();
    }
}