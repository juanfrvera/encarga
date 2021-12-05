import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { AuthModule } from "./auth/auth.module";
import { ComercioComercianteModule } from "./comercio/comercio.comerciante.module";
import { ItemComercianteController } from "./item/item.comerciante.controller";
import { ItemComercianteService } from "./item/item.comerciante.service";

@Module({
    imports: [
        AuthModule,
        ComercioComercianteModule,
        ItemModule
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ComercianteModule { }