import { Injectable } from "@nestjs/common";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { ItemComercianteModel } from "./data/item.comerciante.model";

@Injectable()
export class ItemComercianteService {
    constructor(
        private readonly itemService: ItemService
    ) { }

    public count(comercioId: string): Promise<number> {
        return this.itemService.countByComercio(comercioId);
    }

    public async getList(comercioId: string): Promise<Array<ItemComercianteModel>>{
        const entityList = await this.itemService.getListByComercio(comercioId);

        return entityList.map(e => this.toModel(e));
    }

    private toModel(entity : Item) : ItemComercianteModel{
        return {
            id: entity.id
        }
    }
}