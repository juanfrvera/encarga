import { Module } from "@nestjs/common";
import { ComercioCategoriaModule } from "src/shared/comercio-categoria/comercio-categoria.module";
import { ComercioModule } from "src/shared/comercio/comercio.module";
import { ComercioClienteController } from "./comercio.cliente.controller";
import { ComercioClienteService } from "./comercio.cliente.service";

@Module({
    imports: [
        ComercioModule,
        ComercioCategoriaModule
    ],
    controllers: [ComercioClienteController],
    providers: [ComercioClienteService]
})
export class ComercioClienteModule { }