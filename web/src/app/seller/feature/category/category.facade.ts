import { Injectable } from "@angular/core";
import { ICrudable } from "../../service/interface/crudable.interface";
import { CategoryApiService } from "../../service/category.api.service";
import { CategoryCreateData } from "../../data/category/category.create.data";
import { CategoryLite } from "../../data/category/category-lite.data";
import { Category } from "../../data/category/category.data";

@Injectable()
export class CategoryFacade implements ICrudable<Category, CategoryLite> {
    constructor(
        private readonly api: CategoryApiService
    ) { }

    public getList() {
        return this.api.getList();
    }

    public get(id: string) {
        const category = this.api.get(id);
        return category;
    }

    public create(data: CategoryCreateData) {
        return this.api.create(data);
    }

    public update(data: CategoryLite) {
        return this.api.update(data);
    }

    public delete(id: string) {
        return this.api.delete(id);
    }
}