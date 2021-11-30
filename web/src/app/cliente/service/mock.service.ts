import { Injectable } from "@angular/core";
import { CategoriaLightDto } from "../dto/categoria.light.dto";
import { ItemLightDto } from "../dto/item.light.dto";

@Injectable({
    providedIn: 'root'
})
export class MockService {
    private readonly categoriaList: Array<CategoriaLightDto> = [
        {
            id: '1',
            name: 'Pizzas'
        },
        {
            id: '2',
            name: 'Empanadas'
        },
        {
            id: '3',
            name: 'Hamburguersas'
        }
    ];

    private readonly itemList: ItemLightDto[] = [
        {
            id: '1',
            name: 'Pizza muzzarella',
            price: 250,
            description: 'Masa, salsa, queso muzzarella y orégano',
        },
        {
            id: '2',
            name: 'Pizza especial',
            price: 350,
            description: 'Masa, salsa, queso muzzarella, jamón, aceitunas verdes y morrón',
        },
        {
            id: '3',
            name: 'Empanadas de jamón y queso',
            price: 400,
            description: '12 empanadas caseras de Jamón y Queso',
        },
        {
            id: '4',
            name: 'Empanadas de carne',
            price: 450,
            description: '12 empanadas caseras de carne, huevo, aceituna y morrón',
        },
        {
            id: '5',
            name: 'Hamburguesa simple',
            price: 250,
            description: 'Pan, carne y queso',
        },
    ];

    private readonly itemCategoriaList: Array<{ categoriaId: string, itemId: string }> = [
        // Pizzas
        // Pizza muzzarella
        {
            categoriaId: '1',
            itemId: '1'
        },
        // Pizza especial
        {
            categoriaId: '1',
            itemId: '2'
        },
        // Empanadas
        // Empanadas de jamón y queso
        {
            categoriaId: '2',
            itemId: '3'
        },
        // Empanadas de carne
        {
            categoriaId: '2',
            itemId: '4'
        },
        // Hamburguesas
        // Hamburguesa simple
        {
            categoriaId: '3',
            itemId: '5'
        }
    ]

    public getCategoriaList() {
        return this.categoriaList;
    }

    public getCategoriaListByIdList(idList: Array<string>) {
        let list = this.categoriaList;

        if (idList) {
            list = list.filter(c => idList.find(fId => c.id === fId));
        }

        return list;
    }

    public getItemListByIdList(idList: Array<string>) {
        let list = this.itemList;

        if (idList) {
            list = list.filter(i => idList.find(fId => i.id === fId));
        }

        return list;
    }

    public getItemListByCategoriaIdList(categoriaIdList: Array<string>) {
        let list = this.itemList;

        if (categoriaIdList) {
            list = list.filter(i => {
                for (const categoriaId of categoriaIdList) {
                    for (const itemCategoria of this.itemCategoriaList) {
                        if (itemCategoria.itemId == i.id && itemCategoria.categoriaId == categoriaId) {
                            return true;
                        }
                    }
                }

                return false;
            });
        }

        return list;
    }
}