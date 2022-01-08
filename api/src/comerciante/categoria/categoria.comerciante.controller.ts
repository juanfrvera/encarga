import { Body, Controller, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { ComercianteWithComercioAuthGuard } from "../auth/guard/comerciante-with-comercio-auth.guard";
import { ComercianteWithComercioData } from "../data/comerciante-with-comercio.data";
import { CategoriaComercianteService } from "./categoria.comerciante.service";
import { CategoriaComercianteUpdate } from "./data/categoria-comerciante.update";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";
import { CategoriaComercianteUpdateDto } from "./dto/categoria-comerciante.update.dto";
import { CategoriaComercianteLightDto } from "./dto/categoria.comerciante.light.dto";

@Controller('comerciante/categoria')
@UseGuards(ComercianteWithComercioAuthGuard)
export class CategoriaComercianteController {
    constructor(
        private readonly service: CategoriaComercianteService
    ) { }

    @Get('count')
    public getCount(@Request() request): Promise<number> {
        const user: ComercianteWithComercioData = request.user;

        return this.service.count(user.comercioId);
    }

    @Get()
    public async getList(@Request() request): Promise<Array<CategoriaComercianteLightDto>> {
        const user: ComercianteWithComercioData = request.user;

        const entityList = await this.service.getListByComercioId(user.comercioId);

        return entityList.map(e => this.toLightDto(e));
    }

    @Patch()
    public async update(
        @Body() dto: CategoriaComercianteUpdateDto, @Request() request): Promise<CategoriaComercianteLightDto> {

        const user: ComercianteWithComercioData = request.user;

        const updateData: CategoriaComercianteUpdate = {
            id: dto.id,
            name: dto.name
        };

        const entity = await this.service.update(user.comercioId, updateData);

        return this.toLightDto(entity);
    }

    private toLightDto(entity: CategoriaComercianteModel): CategoriaComercianteLightDto {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}