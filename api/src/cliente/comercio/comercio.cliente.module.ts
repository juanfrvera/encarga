import { Module } from "@nestjs/common";
import { ComercioModule } from "src/shared/comercio/comercio.module";
import { ComercioClienteController } from "./comercio.cliente.controller";
import { ComercioClienteService } from "./comercio.cliente.service";

@Module({
    imports: [ComercioModule],
    controllers: [ComercioClienteController],
    providers: [ComercioClienteService]
})
export class ComercioClienteModule { }