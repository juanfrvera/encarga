import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaStorage } from "src/shared/categoria/categoria.storage";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";
import { CategoriaTypeOrmStorage } from "./categoria.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoriaTypeOrmModel]),
    ],
    providers: [
        {provide: CategoriaStorage, useClass: CategoriaTypeOrmStorage},
        CategoriaTypeOrmStorage
    ],
    exports:[
        CategoriaStorage,
        CategoriaTypeOrmStorage
    ]
})
export class CategoriaTypeOrmModule { }