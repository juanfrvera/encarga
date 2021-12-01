import { Controller, Get, Request } from "@nestjs/common";
import { CategoriaClienteLightDto } from "./categoria.cliente.light.dto";
import { CategoriaClienteModel } from "./categoria.cliente.model";
import { CategoriaClienteService } from "./categoria.cliente.service";

@Controller('cliente/categoria')
export class CategoriaClienteController {
    constructor(
        private readonly service: CategoriaClienteService
    ) { }

    @Get()
    public async getList(@Request() request: Request): Promise<Array<CategoriaClienteLightDto>> {
        const comercioUrl = request.headers['comercio_url'];

        const list = await this.service.getListByComercioUrl(comercioUrl);

        return list.map(e => this.toLightDto(e));
    }

    private toLightDto(entity: CategoriaClienteModel): CategoriaClienteLightDto {
        return {
            id: entity.id,
            name: entity.name
        }
    }
}