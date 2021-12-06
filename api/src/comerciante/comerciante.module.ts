import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriaComercianteModule } from "./categoria/categoria.comerciante.module";
import { ComercioComercianteModule } from "./comercio/comercio.comerciante.module";
import { ItemComercianteModule } from "./item/item.comerciante.module";
import { UsuarioComercioModule } from "./usuario-comercio/usuario-comercio.module";

@Module({
    imports: [
        AuthModule,
        CategoriaComercianteModule,
        ComercioComercianteModule,
        ItemModule,
        ItemComercianteModule,
        UsuarioComercioModule,
    ],
})
export class ComercianteModule { }