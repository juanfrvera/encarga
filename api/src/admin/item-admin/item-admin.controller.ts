import { Controller, Get, NotAcceptableException, Request, UseGuards } from "@nestjs/common";
import { ComercianteAuthGuard } from "src/auth/guard/comerciante-auth.guard";
import { UsuarioComercioService } from "src/usuario-comercio/usuario-comercio.service";
import { ItemAdminService } from "./item-admin.service";

@Controller('itemAdmin')
@UseGuards(ComercianteAuthGuard)
export class ItemAdminController {
    constructor(
        private readonly service: ItemAdminService,
        private readonly usuarioComercioService: UsuarioComercioService) { }

    @Get('count')
    async count(@Request() req) {
        const comercio = await this.getComercio(req);

        if (!comercio) throw new NotAcceptableException('No hay comercio');

        return this.service.count(comercio.url);
    }

    @Get()
    async getAll(@Request() req) {
        const comercio = await this.getComercio(req);
        return this.service.all(comercio.url);
    }

    private getComercio(@Request() req) {
        const idUsuario = req.user.userId;
        return this.usuarioComercioService.getComercioDeUsuario(idUsuario);
    }
}