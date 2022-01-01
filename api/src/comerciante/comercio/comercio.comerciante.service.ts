import { Injectable } from "@nestjs/common";
import { ComercioService } from "src/shared/comercio/comercio.service";
import { Comercio } from "src/shared/comercio/entities/comercio.entity";
import { UsuarioComercioService } from "src/comerciante/usuario-comercio/usuario-comercio.service";
import { ComercioComercianteModel } from "./data/comercio.comerciante.model";
import { ItemCategoriaService } from "src/item-categoria/item-categoria.service";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";

@Injectable()
export class ComercioComercianteService {
    constructor(
        private readonly comercioService: ComercioService,
        private readonly comercioCategoriaService: ComercioCategoriaService,
        private readonly itemCategoriaService: ItemCategoriaService,
        private readonly usuarioComercioService: UsuarioComercioService
    ) { }

    public async getList(usuarioId: string): Promise<Array<ComercioComercianteModel>> {
        const usuarioComercioList = await this.usuarioComercioService.getListByUsuario(usuarioId);

        const comercioIdList = usuarioComercioList.map(uc => uc.comercioId);

        const comercioList = await this.comercioService.getListByIdList(comercioIdList);

        return comercioList.map(e => this.toModel(e));
    }

    public async isItemFromComercio(itemId: string, comercioId: string): Promise<boolean> {
        // Just throw if there is no comercio
        await this.comercioService.getByIdOrThrow(comercioId);

        const categoriaIdList = (await this.comercioCategoriaService.getListByComercioId(comercioId))
            .map(cc => cc.categoriaId);

        for (const categoriaId of categoriaIdList) {
            if (await this.itemCategoriaService.isItemFromCategoria(itemId, categoriaId)) {
                return true;
            }
        }

        return false;
    }

    private toModel(entity: Comercio): ComercioComercianteModel {
        return {
            id: entity.id
        };
    }
}