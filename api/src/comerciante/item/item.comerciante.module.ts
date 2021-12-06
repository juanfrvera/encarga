import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { ComercioComercianteModule } from "../comercio/comercio.comerciante.module";
import { ItemComercianteController } from "./item.comerciante.controller";
import { ItemComercianteService } from "./item.comerciante.service";

@Module({
    imports: [
        ComercioComercianteModule,
        ItemModule
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ItemComercianteModule { }