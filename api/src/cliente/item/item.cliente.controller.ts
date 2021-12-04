import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ItemClienteFilter } from "./item.cliente.filter";
import { ItemClienteLightDto } from "./dto/item.cliente.light.dto";
import { ItemClienteModel } from "./item.cliente.model";
import { ItemClienteService } from "./item.cliente.service";
import { ItemClienteFilterDto } from "./dto/item.cliente.filter.dto";

@Controller('cliente/item')
export class ItemClienteController {
    constructor(
        private readonly service: ItemClienteService
    ) { }

    @Get()
    public async getList(@Query('categoriaId') categoriaId: string): Promise<Array<ItemClienteLightDto>> {
        const filter: ItemClienteFilter = {
            categoriaId,
        };

        const entityList = await this.service.getList(filter);

        return entityList.map(e => this.toLightDto(e));
    }

    @Post('filter')
    public async getListWithFilter(@Body() filterDto: ItemClienteFilterDto) {
        const filter: ItemClienteFilter = {
            idList: filterDto.idList
        };

        const entityList = await this.service.getList(filter);

        return entityList.map(e => this.toLightDto(e));
    }

    private toLightDto(entity: ItemClienteModel): ItemClienteLightDto {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            price: entity.price
        }
    }
}