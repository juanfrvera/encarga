import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { ItemComercianteController } from "./item/item.comerciante.controller";
import { ItemComercianteService } from "./item/item.comerciante.service";

@Module({
    imports: [
        ItemModule
    ],
    controllers: [ItemComercianteController],
    providers: [ItemComercianteService]
})
export class ComercianteModule { }