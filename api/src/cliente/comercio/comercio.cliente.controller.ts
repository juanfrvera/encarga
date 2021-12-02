import { Controller, Get, Request } from "@nestjs/common";
import { ComercioClienteService } from "./comercio.cliente.service";

@Controller('cliente/comercio')
export class ComercioClienteController {
    constructor(
        private readonly service: ComercioClienteService
    ) { }

    @Get('defaultCategoriaId')
    public async getList(@Request() request: Request): Promise<string> {
        const comercioUrl = request.headers['comercio_url'];

        return this.service.getDefaultCategoriaId(comercioUrl);
    }
}