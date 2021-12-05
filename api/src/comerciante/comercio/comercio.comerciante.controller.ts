import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ComercianteAuthGuard } from "../auth/guard/comerciante-auth.guard";
import { ComercianteData } from "../data/comerciante.data";
import { ComercioComercianteService } from "./comercio.comerciante.service";
import { ComercioComercianteModel } from "./data/comercio.comerciante.model";
import { ComercioComercianteLightDto } from "./dto/comercio.comerciante.light.dto";

@Controller('comerciante/comercio')
export class ComercioComercianteController {
    constructor(
        private readonly service: ComercioComercianteService
    ) { }

    @Get()
    @UseGuards(ComercianteAuthGuard)
    public async getList(@Request() request): Promise<Array<ComercioComercianteLightDto>> {
        const user: ComercianteData = request.user;

        const entityList = await this.service.getList(user.usuarioId);

        return entityList.map(e => this.toLightDto(e));
    }

    private toLightDto(entity: ComercioComercianteModel): ComercioComercianteLightDto {
        return {
            id: entity.id
        };
    }
}