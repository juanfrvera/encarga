import { Module } from "@nestjs/common";
import { ComercioModule } from "src/shared/comercio/comercio.module";
import { UsuarioComercioModule } from "src/comerciante/usuario-comercio/usuario-comercio.module";
import { ComercioComercianteController } from "./comercio.comerciante.controller";
import { ComercioComercianteService } from "./comercio.comerciante.service";

@Module({
    imports: [
        ComercioModule,
        UsuarioComercioModule
    ],
    controllers: [ComercioComercianteController],
    providers: [ComercioComercianteService]
})
export class ComercioComercianteModule { }