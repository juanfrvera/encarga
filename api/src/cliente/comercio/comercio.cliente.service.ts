import { Injectable } from "@nestjs/common";
import { ComercioCategoriaService } from "src/shared/comercio-categoria/comercio-categoria.service";
import { ComercioService } from "src/shared/comercio/comercio.service";

@Injectable()
export class ComercioClienteService {
    constructor(
        private readonly comercioService: ComercioService,
        private readonly comercioCategoriaService: ComercioCategoriaService,
    ) { }

    public async getDefaultCategoriaId(comercioUrl: string): Promise<string> {
        const comercio = await this.comercioService.getByUrlOrThrow(comercioUrl);


        const defaultComercioCategoria = await this.comercioCategoriaService.getDefaultForComercioId(comercio.id);


        return defaultComercioCategoria.categoriaId;
    }
}