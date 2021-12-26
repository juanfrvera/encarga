import { Injectable } from "@nestjs/common";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";

@Injectable()
export class CategoriaComercianteService {
    constructor(
        private readonly categoriaService: CategoriaService,
        private readonly comercioCategoriaService: ComercioCategoriaService
    ) { }

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

    private toModel(entity: Categoria): CategoriaComercianteModel {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}