import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";
import { ItemsModule } from "src/items/items.module";
import { UsuarioComercioModule } from "src/usuario-comercio/usuario-comercio.module";
import { ItemAdminController } from "./item-admin.controller";
import { ItemAdminService } from "./item-admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        ItemsModule,
        UsuarioComercioModule
    ],
    controllers: [
        ItemAdminController
    ],
    providers: [
        ItemAdminService
    ]
})
export class ItemAdminModule { }