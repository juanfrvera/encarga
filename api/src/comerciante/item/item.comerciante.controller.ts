import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ComercianteWithComercioAuthGuard } from "src/comerciante/auth/guard/comerciante-with-comercio-auth.guard";
import { ComercianteWithComercioData } from "../data/comerciante-with-comercio.data";
import { ItemComercianteCreateData } from "./data/item.comerciante.create.data";
import { ItemComercianteModel } from "./data/item.comerciante.model";
import { ItemComercianteUpdateData } from "./data/item.comerciante.update.data";
import { ItemComercianteCreateDto } from "./dto/item.comerciante.create.dto";
import { ItemComercianteDto } from "./dto/item.comerciante.dto";
import { ItemComercianteLightDto } from "./dto/item.comerciante.light.dto";
import { ItemComercianteUpdateDto } from "./dto/item.comerciante.update.dto";
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

    @Post()
    public async create(@Body() dto: ItemComercianteCreateDto, @Request() request) {
        const user: ComercianteWithComercioData = request.user;

        const createData: ItemComercianteCreateData = {
            categoriaIdList: dto.categoriaIdList,
            comercioId: user.comercioId,
            description: dto.description,
            name: dto.name,
            price: dto.price
        };

        const entity = await this.service.create(createData);

        return this.toLightDto(entity);
    }

    @Delete(':id')
    public async deleteById(@Param('id') id: string, @Request() request): Promise<void> {
        const user: ComercianteWithComercioData = request.user;

        await this.service.deleteById(id, user.comercioId);
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

    @Patch()
    public async update(
        @Body() updateDto: ItemComercianteUpdateDto, @Request() request): Promise<ItemComercianteLightDto> {
        const user: ComercianteWithComercioData = request.user;

        const updateData: ItemComercianteUpdateData = {
            id: updateDto.id,
            categoriaIdList: updateDto.categoriaIdList,
            description: updateDto.description,
            name: updateDto.name,
            price: updateDto.price
        };

        const entity = await this.service.update(updateData, user.comercioId);

        return this.toLightDto(entity);
    }

    private toDto(entity: ItemComercianteModel): ItemComercianteDto {
        return {
            id: entity.id,
            categoriaIdList: entity.categoriaIdList,
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