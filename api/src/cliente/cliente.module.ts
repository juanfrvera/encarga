import { Module } from "@nestjs/common";
import { CategoriaClienteModule } from "./categoria/categoria.cliente.module";

@Module({
    imports: [
        CategoriaClienteModule
    ]
})
export class ClienteModule { }