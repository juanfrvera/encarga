import { Injectable } from "@nestjs/common";
import { BaseStorage } from "src/base/storage/base.storage";
import { ItemCategoriaService } from "src/item-categoria/item-categoria.service";
import { ItemCreateData } from "src/item/data/item.create.data";
import { ItemUpdateData } from "src/item/data/item.update.data";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { ComercioComercianteService } from "../comercio/comercio.comerciante.service";
import { ItemComercianteCreateData } from "./data/item.comerciante.create.data";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemComercianteUpdateData } from "./data/item.comerciante.update.data";
import { ItemNotFromComercioError } from "./error/item-not-from-comercio.error";

@Injectable()
export class ItemComercianteService {
    constructor(
        private readonly baseStorage: BaseStorage,
        private readonly categoriaService: CategoriaService,
        private readonly comercioComercianteService: ComercioComercianteService,
        private readonly comercioCategoriaService: ComercioCategoriaService,
        private readonly itemService: ItemService,
        private readonly itemCategoriaService: ItemCategoriaService
    ) { }

    public count(comercioId: string): Promise<number> {
        return this.itemService.countByComercio(comercioId);
    }

    public async create(data: ItemComercianteCreateData): Promise<ItemComercianteModel> {
        const createData: ItemCreateData = {
            name: data.name,
            description: data.description,
            price: data.price
        };

        // Check that every categoria exists, throw if not
        if (data.categoriaIdList) {
            for (const categoriaId of data.categoriaIdList) {
                await this.categoriaService.existByIdOrThrow(categoriaId);
            }
        }

        const defaultComercioCategoria = await this.comercioCategoriaService.getDefaultForComercioId(data.comercioId);

        // If no categoria is selected, the default will be added
        if (!data.categoriaIdList || !data.categoriaIdList.length) {
            data.categoriaIdList = [defaultComercioCategoria.categoriaId];
        }

        return this.baseStorage.startTransaction(async transaction => {
            const entity = await this.itemService.create(createData, transaction);

            for (const categoriaId of data.categoriaIdList) {
                // Create item categoria information
                await this.itemCategoriaService.createWithMinimumOrder(entity.id, categoriaId, transaction);
            }

            // All categorias except the default
            const returnedCategoriaIdList = data.categoriaIdList.filter(
                cId => cId != defaultComercioCategoria.categoriaId);

            return this.toModelWithCategoriaIdList(entity, returnedCategoriaIdList);
        });
    }

    public async deleteById(id: string, comercioId: string) {
        await this.isFromComercioOrThrow(id, comercioId);

        await this.baseStorage.startTransaction(async transaction => {
            await this.itemCategoriaService.deleteByItemId(id, transaction);
            await this.itemService.deleteById(id, transaction);
        });
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

            const defaultCategoriaId = (await this.comercioCategoriaService.
                getDefaultForComercioId(comercioId)).categoriaId;

            return this.baseStorage.startTransaction(async transaction => {
                const entity = await this.itemService.update(itemUpdateData, transaction);

                if (data.categoriaIdList != undefined) {

                    // If no categoria is set, use the default
                    if (!data.categoriaIdList.length) {
                        data.categoriaIdList = [defaultCategoriaId];
                    }

                    const itemCategoriaList = await this.itemCategoriaService.getListByItemId(data.id, transaction);

                    // Add categorias
                    // Categorias to add are the ones that aren't find in the itemCategoriaList
                    const categoriaIdListToAdd = data.categoriaIdList.filter(cId =>
                        !itemCategoriaList.find(ic => ic.categoriaId == cId));

                    for (const categoriaIdToAdd of categoriaIdListToAdd) {
                        await this.categoriaService.existByIdOrThrow(categoriaIdToAdd, transaction);
                        await this.itemCategoriaService.createWithMinimumOrder(data.id, categoriaIdToAdd, transaction);
                    }


                    // Remove categorias
                    // ItemCategorias to remove are the ones that are in itemCategoriaList but not in data.categoriaIdList
                    const itemCategoriaListToRemove = itemCategoriaList.filter(ic =>
                        !data.categoriaIdList.find(cId => cId == ic.categoriaId)
                    );

                    for (const itemCategoriaToRemove of itemCategoriaListToRemove) {
                        await this.itemCategoriaService.deleteById(itemCategoriaToRemove.id, transaction);
                    }
                }

                return this.toModel(entity, defaultCategoriaId);
            });
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

    private toModelWithCategoriaIdList(entity: Item, categoriaIdList: Array<string>): ItemComercianteModel {
        return {
            id: entity.id,
            categoriaIdList,
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}