import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ComercianteAuthGuard } from "src/auth/guard/comerciante-auth.guard";
import { ComercianteInputData } from "../data/comerciante.input.data";
import { ItemComercianteLightDto } from "./dto/item.comerciante.light.dto";
import { ItemComercianteService } from "./item.comerciante.service";

@Controller('comerciante/item')
@UseGuards(ComercianteAuthGuard)
export class ItemComercianteController {
    constructor(
        private readonly service: ItemComercianteService
    ){}
    
    @Get('count')
    public count(@Request() request): Promise<number> {
        const user : ComercianteInputData = request.user;
        
        return this.service.count(user.comercioId);
    }

    @Get()
    public getList(@Request() request): Promise<Array<ItemComercianteLightDto>>{
        const user : ComercianteInputData = request.user;

        return this.service.getList(user.comercioId);
    }
}