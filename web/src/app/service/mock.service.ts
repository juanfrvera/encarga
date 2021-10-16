import { Injectable } from "@angular/core";
import { CategoriaFilter } from "../data/categoria/categoria-filter";
import { CategoriaListDto } from "../data/categoria/categoria-list.dto";

@Injectable({
    providedIn: 'root'
})
export class MockService {
    private readonly categorias: CategoriaListDto[] = [
        {
            id: '1',
            nombre: 'Pizzas'
        },
        {
            id: '2',
            nombre: 'Empanadas'
        },
        {
            id: '3',
            nombre: 'Hamburguersas'
        }
    ];

    getWithFilter(filter: CategoriaFilter) {
        let lista = this.categorias;

        if (filter.ids) {
            lista = lista.filter(c => c.id in filter.ids!);
        }

        return lista;
    }
}