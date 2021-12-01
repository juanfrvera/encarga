import { Module } from "@nestjs/common";
import { CategoriaModule } from "src/shared/categoria/categoria.module";
import { ComercioModule } from "src/shared/comercio/comercio.module";
import { CategoriaClienteController } from "./categoria.cliente.controller";
import { CategoriaClienteService } from "./categoria.cliente.service";

@Module({
    imports: [
        CategoriaModule,
        ComercioModule
    ],
    controllers: [CategoriaClienteController],
    providers: [CategoriaClienteService]
})
export class CategoriaClienteModule { }