import { Injectable } from "@nestjs/common";
import { ItemFilter } from "src/item/data/item.filter";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { ItemClienteFilter } from "./item.cliente.filter";
import { ItemClienteModel } from "./item.cliente.model";

@Injectable()
export class ItemClienteService {
    constructor(
        private readonly itemService: ItemService
    ) { }

    public async getList(filter: ItemClienteFilter): Promise<Array<ItemClienteModel>> {
        const itemFilter: ItemFilter = {
            categoriaId: filter.categoriaId,
            idList: filter.idList
        };

        const entityList = await this.itemService.getList(itemFilter);

        return entityList.map(e => this.toModel(e));
    }

    private toModel(entity: Item): ItemClienteModel {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}