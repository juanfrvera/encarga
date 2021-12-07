import { Injectable } from "@nestjs/common";
import { ItemCategoriaService } from "src/item-categoria/item-categoria.service";
import { ItemUpdateData } from "src/item/data/item.update.data";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { ComercioComercianteService } from "../comercio/comercio.comerciante.service";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemComercianteUpdateData } from "./data/item.comerciante.update.data";
import { ItemNotFromComercioError } from "./error/item-not-from-comercio.error";

@Injectable()
export class ItemComercianteService {
    constructor(
        private readonly comercioComercianteService: ComercioComercianteService,
        private readonly comercioCategoriaService: ComercioCategoriaService,
        private readonly itemService: ItemService,
        private readonly itemCategoriaService: ItemCategoriaService
    ) { }

    public count(comercioId: string): Promise<number> {
        return this.itemService.countByComercio(comercioId);
    }

    public async getById(id: string, comercioId: string): Promise<ItemComercianteModel> {
        if (await this.isFromComercioOrThrow(id, comercioId)) {
            const entity = await this.itemService.getById(id);

            const defaultCategoriaId = (await this.comercioCategoriaService.getDefaultForComercioId(comercioId)).categoriaId;

            return this.toModel(entity, defaultCategoriaId);
        }
    }

    public async getList(comercioId: string): Promise<Array<ItemComercianteModel>> {
        const entityList = await this.itemService.getListByComercio(comercioId);

        const defaultCategoriaId = (await this.comercioCategoriaService.getDefaultForComercioId(comercioId)).categoriaId;

        return Promise.all(entityList.map(e => this.toModel(e, defaultCategoriaId)));
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

            const defaultCategoriaId = (await this.comercioCategoriaService.getDefaultForComercioId(comercioId)).categoriaId;

            return this.toModel(entity, defaultCategoriaId);
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

    private async toModel(entity: Item, defaultCategoriaId: string): Promise<ItemComercianteModel> {
        const itemCategoriaList = (await this.itemCategoriaService.getListByItemId(entity.id))
            .filter(ic => ic.categoriaId != defaultCategoriaId);

        return {
            id: entity.id,
            categoriaIdList: itemCategoriaList.map(ic => ic.categoriaId),
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}