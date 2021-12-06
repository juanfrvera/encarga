import { Injectable } from "@nestjs/common";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { ComercioComercianteService } from "../comercio/comercio.comerciante.service";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemNotFromComercioError } from "./error/item-not-from-comercio.error";

@Injectable()
export class ItemComercianteService {
    constructor(
        private readonly comercioComercianteService: ComercioComercianteService,
        private readonly itemService: ItemService
    ) { }

    public count(comercioId: string): Promise<number> {
        return this.itemService.countByComercio(comercioId);
    }

    public async getById(id: string, comercioId: string): Promise<ItemComercianteModel> {
        if (await this.comercioComercianteService.isItemFromComercio(id, comercioId)) {
            const entity = await this.itemService.getById(id);

            return this.toModel(entity);
        }
        else {
            throw new ItemNotFromComercioError();
        }
    }

    public async getList(comercioId: string): Promise<Array<ItemComercianteModel>> {
        const entityList = await this.itemService.getListByComercio(comercioId);

        return entityList.map(e => this.toModel(e));
    }

    private toModel(entity: Item): ItemComercianteModel {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}