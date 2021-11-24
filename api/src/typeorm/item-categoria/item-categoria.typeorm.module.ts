import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemCategoriaStorage } from "src/item-categoria/item-categoria.storage";
import { CategoriaTypeOrmModule } from "../categoria/categoria.typeorm.module";
import { ItemTypeOrmModule } from "../item/item.typeorm.module";
import { ItemCategoriaTypeOrmModel } from "./item-categoria.typeorm.model";
import { ItemCategoriaTypeOrmStorage } from "./item-categoria.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemCategoriaTypeOrmModel]),
        CategoriaTypeOrmModule,
        ItemTypeOrmModule
    ],
    providers: [
        {provide: ItemCategoriaStorage, useClass: ItemCategoriaTypeOrmStorage}
    ],
    exports:[
        ItemCategoriaStorage
    ]
})
export class ItemCategoriaTypeOrmModule { }