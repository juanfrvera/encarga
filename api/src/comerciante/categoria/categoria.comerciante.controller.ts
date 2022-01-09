import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ComercianteWithComercioAuthGuard } from "../auth/guard/comerciante-with-comercio-auth.guard";
import { ComercianteWithComercioData } from "../data/comerciante-with-comercio.data";
import { CategoriaComercianteService } from "./categoria.comerciante.service";
import { CategoriaComercianteCreate } from "./data/categoria-comerciante.create";
import { CategoriaComercianteUpdate } from "./data/categoria-comerciante.update";
import { CategoriaComercianteModel } from "./data/categoria.comerciante.model";
import { CategoriaComercianteCreateDto } from "./dto/categoria-comerciante.create.dto";
import { CategoriaComercianteUpdateDto } from "./dto/categoria-comerciante.update.dto";
import { CategoriaComercianteLightDto } from "./dto/categoria.comerciante.light.dto";

@Controller('comerciante/categoria')
@UseGuards(ComercianteWithComercioAuthGuard)
export class CategoriaComercianteController {
    constructor(
        private readonly service: CategoriaComercianteService
    ) { }

    @Post()
    public async create(@Body() dto: CategoriaComercianteCreateDto, @Request() request): Promise<CategoriaComercianteLightDto> {
        const user: ComercianteWithComercioData = request.user;

        const createData: CategoriaComercianteCreate = {
            name: dto.name
        };

        const entity = await this.service.create(createData, user.comercioId);

        return this.toLightDto(entity);
    }

    @Delete(':categoriaId')
    public deleteByCategoriaId(@Param('categoriaId') categoriaId: string, @Request() request): Promise<void>{
        const user: ComercianteWithComercioData = request.user;

        return this.service.deleteByCategoriaId(categoriaId, user.comercioId);
    }

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