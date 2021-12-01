import { Injectable } from "@nestjs/common";
import { CategoriaService } from "src/shared/categoria/categoria.service";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ComercioService } from "src/shared/comercio/comercio.service";
import { CategoriaClienteModel } from "./categoria.cliente.model";

@Injectable()
export class CategoriaClienteService {
    constructor(
        private readonly categoriaService: CategoriaService,
        private readonly comercioService: ComercioService
    ) { }

    public async getListByComercioUrl(comercioUrl: string): Promise<Array<CategoriaClienteModel>> {
        const comercio = await this.comercioService.getByUrlOrThrow(comercioUrl);

        const list = await this.categoriaService.getListByComercioIdNotEmpty(comercio.id);

        return list.map(e => this.toModel(e));
    }

    private toModel(entity: Categoria): CategoriaClienteModel {
        return {
            id: entity.id,
            name: entity.name
        }
    }
}