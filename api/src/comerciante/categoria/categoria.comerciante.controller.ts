import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ComercianteWithComercioAuthGuard } from "../auth/guard/comerciante-with-comercio-auth.guard";
import { ComercianteWithComercioData } from "../data/comerciante-with-comercio.data";
import { CategoriaComercianteService } from "./categoria.comerciante.service";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";
import { CategoriaComercianteLightDto } from "./dto/categoria.comerciante.light.dto";

@Controller('comerciante/categoria')
@UseGuards(ComercianteWithComercioAuthGuard)
export class CategoriaComercianteController {
    constructor(
        private readonly service: CategoriaComercianteService
    ) { }

    @Get()
    public async getList(@Request() request): Promise<Array<CategoriaComercianteLightDto>> {
        const user: ComercianteWithComercioData = request.user;

        const entityList = await this.service.getListByComercio(user.comercioId);

        return entityList.map(e => this.toLightDto(e));
    }

    private toLightDto(entity: CategoriaComercianteModel): CategoriaComercianteLightDto {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}