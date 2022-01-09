import { Module } from "@nestjs/common";
import { BaseModule } from "src/base/base.module";
import { CategoriaModule } from "src/shared/categoria/categoria.module";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";
import { CategoriaComercianteController } from "./categoria.comerciante.controller";
import { CategoriaComercianteService } from "./categoria.comerciante.service";

@Module({
    imports: [
        BaseModule,
        CategoriaModule,
        ComercioCategoriaModule
    ],
    controllers: [CategoriaComercianteController],
    providers: [CategoriaComercianteService]
})
export class CategoriaComercianteModule { }