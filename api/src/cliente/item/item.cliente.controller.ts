import { Controller, Get, Query } from "@nestjs/common";
import { ItemClienteFilter } from "./item.cliente.filter";
import { ItemClienteLightDto } from "./item.cliente.light.dto";
import { ItemClienteModel } from "./item.cliente.model";
import { ItemClienteService } from "./item.cliente.service";

@Controller('cliente/item')
export class ItemClienteController {
    constructor(
        private readonly service: ItemClienteService
    ) { }

    @Get()
    public async getList(
        @Query('categoriaId') categoriaId: string,
        @Query('idList') idList: Array<string>): Promise<Array<ItemClienteLightDto>> {
        const filter: ItemClienteFilter = {
            categoriaId,
            idList
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