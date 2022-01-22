import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemTypeOrmModel } from "./item.typeorm.model";
import { ItemTypeOrmStorage } from "./item.typeorm.storage";
import { ItemStorage } from "src/shared/item/item.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemTypeOrmModel])
    ],
    providers: [
        {provide: ItemStorage, useClass: ItemTypeOrmStorage},
        ItemTypeOrmStorage
    ],
    exports: [
        ItemStorage,
        ItemTypeOrmStorage
    ]
})
export class ItemTypeOrmModule { }