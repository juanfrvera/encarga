import { Module } from "@nestjs/common";
import { BaseModule } from "src/base/base.module";
import { ItemCategoriaModule } from "src/item-categoria/item-categoria.module";
import { CategoriaModule } from "src/shared/categoria/categoria.module";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";
import { CategoriaComercianteController } from "./categoria.comerciante.controller";
import { CategoriaComercianteService } from "./categoria.comerciante.service";

@Module({
    imports: [
        BaseModule,
        CategoriaModule,
        ComercioCategoriaModule,
        ItemCategoriaModule,
    ],
    controllers: [CategoriaComercianteController],
    providers: [CategoriaComercianteService]
})
export class CategoriaComercianteModule { }