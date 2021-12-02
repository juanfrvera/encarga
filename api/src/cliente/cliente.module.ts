import { Module } from "@nestjs/common";
import { CategoriaClienteModule } from "./categoria/categoria.cliente.module";
import { ItemClienteModule } from "./item/item.cliente.module";

@Module({
    imports: [
        CategoriaClienteModule,
        ItemClienteModule
    ]
})
export class ClienteModule { }