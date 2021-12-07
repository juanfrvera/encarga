import { Module } from "@nestjs/common";
import { ItemCategoriaModule } from "src/item-categoria/item-categoria.module";
import { ItemModule } from "src/item/item.module";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";
import { ComercioComercianteModule } from "../comercio/comercio.comerciante.module";
import { ItemComercianteController } from "./item.comerciante.controller";
import { ItemComercianteService } from "./item.comerciante.service";

@Module({
    imports: [
        ComercioCategoriaModule,
        ComercioComercianteModule,
        ItemCategoriaModule,
        ItemModule
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ItemComercianteModule { }