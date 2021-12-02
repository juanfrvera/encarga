import { Module } from "@nestjs/common";
import { ItemModule } from "src/item/item.module";
import { ItemClienteController } from "./item.cliente.controller";
import { ItemClienteService } from "./item.cliente.service";

@Module({
    imports: [ItemModule],
    controllers: [ItemClienteController],
    providers: [ItemClienteService]
})
export class ItemClienteModule { }