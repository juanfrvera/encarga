import { Injectable } from "@nestjs/common";
import { ItemUpdateData } from "src/item/data/item.update.data";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { ComercioComercianteService } from "../comercio/comercio.comerciante.service";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemComercianteUpdateData } from "./data/item.comerciante.update.data";
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
        if (await this.isFromComercioOrThrow(id, comercioId)) {
            const entity = await this.itemService.getById(id);

            return this.toModel(entity);
        }
    }

    public async getList(comercioId: string): Promise<Array<ItemComercianteModel>> {
        const entityList = await this.itemService.getListByComercio(comercioId);

        return entityList.map(e => this.toModel(e));
    }

    public async update(data: ItemComercianteUpdateData, comercioId: string): Promise<ItemComercianteModel> {
        if (await this.comercioComercianteService.isItemFromComercio(data.id, comercioId)) {
            const itemUpdateData: ItemUpdateData = {
                id: data.id,
                description: data.description,
                name: data.name,
                price: data.price
            };

            const entity = await this.itemService.update(itemUpdateData);

            return this.toModel(entity);
        }
        else {
            throw new ItemNotFromComercioError();
        }
    }

    private async isFromComercioOrThrow(id: string, comercioId: string): Promise<boolean> {
        if (await this.comercioComercianteService.isItemFromComercio(id, comercioId)) {
            return true;
        }
        else {
            throw new ItemNotFromComercioError();
        }
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