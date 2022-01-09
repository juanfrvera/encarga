import { Injectable } from "@nestjs/common";
import { BaseStorage } from "src/base/storage/base.storage";
import { ItemCategoriaService } from "src/item-categoria/item-categoria.service";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { CategoriaCreate } from "src/shared/categoria/data/categoria.create";
import { CategoriaUpdate } from "src/shared/categoria/data/categoria.update";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { CategoriaComercianteCreate } from "./data/categoria-comerciante.create";
import { CategoriaComercianteUpdate } from "./data/categoria-comerciante.update";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";
import { CategoriaNotFromComercioError } from "./error/categoria-not-from-comercio.error";

@Injectable()
export class CategoriaComercianteService {
    constructor(
        private readonly baseStorage: BaseStorage,
        private readonly categoriaService: CategoriaService,
        private readonly comercioCategoriaService: ComercioCategoriaService,
        private readonly itemCategoriaService: ItemCategoriaService
    ) { }

    public async count(comercioId: string): Promise<number> {
        const count = await this.comercioCategoriaService.countByComercioId(comercioId);

        // subtract one because the default categoria is not counted
        return count - 1;
    }

    public async create(data: CategoriaComercianteCreate, comercioId: string): Promise<CategoriaComercianteModel> {
        return this.baseStorage.startTransaction(async newTransaction => {
            const createData: CategoriaCreate = {
                name: data.name
            };

            const entity = await this.categoriaService.create(createData, newTransaction);

            await this.comercioCategoriaService.create(comercioId, entity.id, newTransaction);

            return this.toModel(entity);
        })
    }

    public async deleteByCategoriaId(categoriaId: string, comercioId: string) {
        const isFromComercio = await this.comercioCategoriaService.isCategoriaFromComercio(categoriaId, comercioId);

        if (isFromComercio) {
            await this.baseStorage.startTransaction(async newTransaction => {
                // Get item categoria relations to use them later
                const itemCategoriaList = await this.itemCategoriaService.getListByCategoriaId(
                    categoriaId, newTransaction);

                // First delete relations that use the categoria
                await this.itemCategoriaService.deleteByCategoriaId(categoriaId, newTransaction);
                await this.comercioCategoriaService.deleteByCategoriaId(categoriaId, newTransaction);
                
                // Next delete the categoria
                await this.categoriaService.deleteById(categoriaId, newTransaction);

                const itemIdList = itemCategoriaList.map(ic => ic.itemId);

                const defaultCategoriaId = (await this.comercioCategoriaService.getDefaultForComercioId(comercioId))
                    .categoriaId;

                // Check items that left orphan
                for (const itemId of itemIdList) {
                    const hasCategoria = await this.itemCategoriaService.itemHasCategoria(itemId, newTransaction);

                    // If the item will be left orphan, assign it the default category of this comercio
                    if (!hasCategoria) {
                        await this.itemCategoriaService.createWithMinimumOrder(
                            itemId, defaultCategoriaId, newTransaction);
                    }
                }
            });
        }
        else {
            throw new CategoriaNotFromComercioError();
        }
    }

    public async getListByComercioId(comercioId: string): Promise<Array<CategoriaComercianteModel>> {
        const comercioCategoriaList = await this.comercioCategoriaService.getListByComercioId(comercioId);

        const defaultCategoria = await this.comercioCategoriaService.getDefaultForComercioId(comercioId);

        const categoriaIdList = comercioCategoriaList
            // Take out the default categoria    
            .filter(cc => cc.categoriaId != defaultCategoria.categoriaId)
            .map(cc => cc.categoriaId);

        const entityList = await this.categoriaService.getListByIdList(categoriaIdList);

        return entityList.map(e => this.toModel(e));
    }

    public async update(comercioId: string, data: CategoriaComercianteUpdate): Promise<CategoriaComercianteModel> {
        const exist = await this.comercioCategoriaService.isCategoriaFromComercio(data.id, comercioId);

        if (exist) {
            const updateData: CategoriaUpdate = {
                id: data.id,
                name: data.name
            };

            const entity = await this.categoriaService.update(updateData);

            return this.toModel(entity);
        }
        else {
            throw new CategoriaNotFromComercioError();
        }
    }

    private toModel(entity: Categoria): CategoriaComercianteModel {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}