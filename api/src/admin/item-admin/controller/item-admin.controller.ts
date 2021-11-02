import { Body, Controller, Get, NotAcceptableException, Post, Request, UseGuards } from "@nestjs/common";
import { ComercianteAuthGuard } from "src/auth/guard/comerciante-auth.guard";
import { UsuarioComercioService } from "src/usuario-comercio/usuario-comercio.service";
import { ItemCreateDto } from "./dto/item-create.dto";
import { ItemAdminService } from "../service/item-admin.service";
import { ItemCreateData } from "../service/service-data/item-create.data";
import { ItemLightDto } from "./dto/item-light-dto";

@Controller('admin/item')
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

    @Post()
    async create(@Body() dto: ItemCreateDto) {
        if (!dto.titulo) throw new NotAcceptableException('Ingrese un nombre');

        const createData: ItemCreateData = {
            idsCategorias: dto.idsCategorias,
            descripcion: dto.descripcion,
            precio: dto.precio,
            titulo: dto.titulo
        };

        const created = await this.service.create(createData);

        const lightDto: ItemLightDto = {
            id: created.id,
            titulo: created.titulo
        };

        return lightDto;
    }

    private getComercio(@Request() req) {
        const idUsuario = req.user.userId;
        return this.usuarioComercioService.getComercioDeUsuario(idUsuario);
    }
}