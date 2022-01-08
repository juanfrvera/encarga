import { Injectable } from "@nestjs/common";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { CategoriaUpdate } from "src/shared/categoria/data/categoria.update";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { CategoriaComercianteUpdate } from "./data/categoria-comerciante.update";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";
import { CategoriaNotFromComercioError } from "./error/categoria-not-from-comercio.error";

@Injectable()
export class CategoriaComercianteService {
    constructor(
        private readonly categoriaService: CategoriaService,
        private readonly comercioCategoriaService: ComercioCategoriaService
    ) { }

    public async count(comercioId: string): Promise<number> {
        const count = await this.comercioCategoriaService.countByComercioId(comercioId);

        // subtract one because the default categoria is not counted
        return count - 1;
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