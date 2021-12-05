import { Injectable } from "@nestjs/common";
import { ComercioService } from "src/shared/comercio/comercio.service";
import { Comercio } from "src/shared/comercio/entities/comercio.entity";
import { UsuarioComercioService } from "src/comerciante/usuario-comercio/usuario-comercio.service";
import { ComercioComercianteModel } from "./data/comercio.comerciante.model";

@Injectable()
export class ComercioComercianteService {
    constructor(
        private readonly comercioService: ComercioService,
        private readonly usuarioComercioService: UsuarioComercioService
    ) { }

    public async getList(usuarioId: string): Promise<Array<ComercioComercianteModel>> {
        const usuarioComercioList = await this.usuarioComercioService.getListByUsuario(usuarioId);

        const comercioIdList = usuarioComercioList.map(uc => uc.comercioId);

        const comercioList = await this.comercioService.getListByIdList(comercioIdList);

        return comercioList.map(e => this.toModel(e));
    }

    private toModel(entity: Comercio): ComercioComercianteModel {
        return {
            id: entity.id
        };
    }
}