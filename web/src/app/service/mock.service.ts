import { Injectable } from "@angular/core";
import { CategoriaFilter } from "../data/categoria/categoria-filter";
import { CategoriaListDto } from "../data/categoria/categoria-list.dto";
import { Item } from "../data/item/item";
import { ItemFilter } from "../data/item/item-filter";

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

    private readonly items: Item[] = [
        {
            id: '1',
            titulo: 'Pizza muzzarella',
            precio: 250,
            descripcion: 'Masa, salsa, queso muzzarella y orégano',
            idsCategorias: ['1']
        },
        {
            id: '2',
            titulo: 'Pizza especial',
            precio: 350,
            descripcion: 'Masa, salsa, queso muzzarella, jamón, aceitunas verdes y morrón',
            idsCategorias: ['1']
        },
        {
            id: '3',
            titulo: 'Empanadas de jamón y queso',
            precio: 400,
            descripcion: '12 empanadas caseras de Jamón y Queso',
            idsCategorias: ['2']
        },
        {
            id: '4',
            titulo: 'Empanadas de carne',
            precio: 450,
            descripcion: '12 empanadas caseras de carne, huevo, aceituna y morrón',
            idsCategorias: ['2']
        },
        {
            id: '5',
            titulo: 'Hamburguesa simple',
            precio: 250,
            descripcion: 'Pan, carne y queso',
            idsCategorias: ['3']
        },
    ]

    getCategoriasWithFilter(filter: CategoriaFilter) {
        let lista = this.categorias;

        if (filter.ids) {
            lista = lista.filter(c => filter.ids?.find(fId => c.id === fId));
        }

        return lista;
    }

    getItemsWithFilter(filter: ItemFilter) {
        console.log('Mock de items con el filtro: ' + JSON.stringify(filter));
        let lista = this.items;

        if (filter.ids) {
            lista = lista.filter(i => filter.ids?.find(fId => i.id === fId));
        }

        if (filter.idsCategorias) {
            lista = lista.filter(i => {
                for (const filterIdCat of filter.idsCategorias!) {
                    if (i.idsCategorias) {
                        if (i.idsCategorias.find(idCat => idCat == filterIdCat)) {
                            return true;
                        }
                    }
                }

                return false;
            });
        }

        console.log('Respuesta: ' + JSON.stringify(lista.map(i => i.titulo)));

        return lista;
    }
}