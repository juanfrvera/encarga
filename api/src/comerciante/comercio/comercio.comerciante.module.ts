import { Module } from "@nestjs/common";
import { ComercioModule } from "src/shared/comercio/comercio.module";
import { UsuarioComercioModule } from "src/comerciante/usuario-comercio/usuario-comercio.module";
import { ComercioComercianteController } from "./comercio.comerciante.controller";
import { ComercioComercianteService } from "./comercio.comerciante.service";
import { ItemCategoriaModule } from "src/item-categoria/item-categoria.module";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";

@Module({
    imports: [
        ComercioModule,
        ComercioCategoriaModule,
        ItemCategoriaModule,
        UsuarioComercioModule
    ],
    controllers: [ComercioComercianteController],
    providers: [ComercioComercianteService],
    exports: [ComercioComercianteService]
})
export class ComercioComercianteModule { }