import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriaComercianteModule } from "./categoria/categoria.comerciante.module";
import { ComercioComercianteModule } from "./comercio/comercio.comerciante.module";
import { ItemComercianteController } from "./item/item.comerciante.controller";
import { ItemComercianteService } from "./item/item.comerciante.service";
import { UsuarioComercioModule } from "./usuario-comercio/usuario-comercio.module";

@Module({
    imports: [
        AuthModule,
        CategoriaComercianteModule,
        ComercioComercianteModule,
        ItemModule,
        UsuarioComercioModule,
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ComercianteModule { }