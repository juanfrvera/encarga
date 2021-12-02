import { Module } from "@nestjs/common";
import { CategoriaClienteModule } from "./categoria/categoria.cliente.module";
import { ComercioClienteModule } from "./comercio/comercio.cliente.module";
import { ItemClienteModule } from "./item/item.cliente.module";

@Module({
    imports: [
        CategoriaClienteModule,
        ComercioClienteModule,
        ItemClienteModule
    ]
})
export class ClienteModule { }