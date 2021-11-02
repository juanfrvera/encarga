import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";
import { UsuarioComercioModule } from "src/usuario-comercio/usuario-comercio.module";
import { ItemAdminController } from "./controller/item-admin.controller";
import { ItemAdminConcreteService } from "./service/item-admin.concrete.service";
import { ItemAdminService } from "./service/item-admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        UsuarioComercioModule
    ],
    controllers: [
        ItemAdminController
    ],
    providers: [
        { provide: ItemAdminService, useClass: ItemAdminConcreteService }
    ]
})
export class ItemAdminModule { }