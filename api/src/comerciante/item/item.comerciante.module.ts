import { Module } from "@nestjs/common";
import { BaseModule } from "src/base/base.module";
import { ItemCategoriaModule } from "src/item-categoria/item-categoria.module";
import { ItemModule } from "src/item/item.module";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";
import { ComercioComercianteModule } from "../comercio/comercio.comerciante.module";
import { ItemComercianteController } from "./item.comerciante.controller";
import { ItemComercianteService } from "./item.comerciante.service";

@Module({
    imports: [
        BaseModule,
        ComercioCategoriaModule,
        ComercioComercianteModule,
        ItemCategoriaModule,
        ItemModule
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ItemComercianteModule { }