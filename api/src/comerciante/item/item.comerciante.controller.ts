import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ComercianteWithComercioAuthGuard } from "src/comerciante/auth/guard/comerciante-with-comercio-auth.guard";
import { ComercianteWithComercioData } from "../data/comerciante-with-comercio.data";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemComercianteDto } from "./dto/item.comerciante.dto";
import { ItemComercianteLightDto } from "./dto/item.comerciante.light.dto";
import { ItemComercianteService } from "./item.comerciante.service";

@Controller('comerciante/item')
@UseGuards(ComercianteWithComercioAuthGuard)
export class ItemComercianteController {
    constructor(
        private readonly service: ItemComercianteService
    ) { }

    @Get('count')
    public count(@Request() request): Promise<number> {
        const user: ComercianteWithComercioData = request.user;

        return this.service.count(user.comercioId);
    }

    @Get()
    public async getList(@Request() request): Promise<Array<ItemComercianteLightDto>> {
        const user: ComercianteWithComercioData = request.user;

        const entityList = await this.service.getList(user.comercioId);

        return entityList.map(e => this.toLightDto(e));
    }

    @Get(':id')
    public async getById(@Param('id') id: string, @Request() request): Promise<ItemComercianteDto> {
        const user: ComercianteWithComercioData = request.user;

        const entity = await this.service.getById(id, user.comercioId);

        return this.toDto(entity);
    }

    private toDto(entity: ItemComercianteModel): ItemComercianteDto {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            price: entity.price
        };
    }

    private toLightDto(entity: ItemComercianteModel): ItemComercianteLightDto {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}