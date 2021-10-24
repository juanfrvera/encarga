import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Item } from "../data/item/item";
import { ItemAdminFilterDto } from "../data/item/item-admin/item-admin.filter.dto";
import { ItemListDto } from "../data/item/item-list.dto";
import { ItemDto } from "../data/item/item.dto";
import { ApiService } from "./instance/api.service";
import { CrudService } from "./instance/crud.service";

@Injectable({
    providedIn: 'root'
})
export class ItemAdminService extends CrudService<Item, ItemDto, ItemListDto, ItemAdminFilterDto> {
    constructor(readonly http: HttpClient) {
        super(http, 'itemAdmin/');
    }

    protected fromListDto(listDto: ItemListDto): Item {
        throw new Error("Method not implemented.");
    }
    protected fromDto(dto: ItemDto): Item {
        throw new Error("Method not implemented.");
    }
    protected toDto(Entity: Item): ItemDto {
        throw new Error("Method not implemented.");
    }

    public count() {
        const listaActual = this.lista.value;

        if (listaActual) {
            return of(listaActual.length);
        }
        else {
            return this.http.get<number>(ApiService.Url + this.Route + 'count');
        }
    }
}