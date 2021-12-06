import { Injectable } from "@nestjs/common";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";

@Injectable()
export class CategoriaComercianteService {
    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    public async getListByComercio(comercioId: string): Promise<Array<CategoriaComercianteModel>> {
        const entityList = await this.categoriaService.getListByComercioId(comercioId);

        return entityList.map(e => this.toModel(e));
    }

    private toModel(entity: Categoria): CategoriaComercianteModel {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}