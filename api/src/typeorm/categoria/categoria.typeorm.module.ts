import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaStorage } from "src/categoria/categoria.storage";
import { ComercioTypeOrmModule } from "../comercio/comercio.typeorm.module";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";
import { CategoriaTypeOrmStorage } from "./categoria.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoriaTypeOrmModel]),
        forwardRef(() => ComercioTypeOrmModule)
    ],
    providers: [
        {provide: CategoriaStorage, useClass: CategoriaTypeOrmStorage},
        CategoriaTypeOrmStorage
    ],
    exports:[
        CategoriaTypeOrmStorage
    ]
})
export class CategoriaTypeOrmModule { }