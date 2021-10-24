import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ApiService } from "./instance/api.service";
import { ItemService } from "./item.service";

@Injectable({
    providedIn: 'root'
})
export class ItemAdminService extends ItemService {
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