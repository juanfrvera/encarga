import { Injectable } from "@nestjs/common";
import { ComercioService } from "src/shared/comercio/comercio.service";

@Injectable()
export class ComercioClienteService {
    constructor(
        private readonly comercioService: ComercioService
    ) { }

    public async getDefaultCategoriaId(comercioUrl: string): Promise<string> {
        const comercio = await this.comercioService.getByUrlOrThrow(comercioUrl);

        return comercio.categoriaDefaultId;
    }
}