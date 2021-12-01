import { Module } from "@nestjs/common";
import { CategoriaModule } from "./categoria/categoria.module";
import { ComercioModule } from "./comercio/comercio.module";

@Module({
    imports: [
        CategoriaModule,
        ComercioModule
    ]
})
export class SharedModule { }