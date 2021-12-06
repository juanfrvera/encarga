import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComercioStorage } from "src/shared/comercio/comercio.storage";
import { CategoriaTypeOrmModule } from "../categoria/categoria.typeorm.module";
import { ComercioTypeOrmModel } from "./comercio.typeorm.model";
import { ComercioTypeOrmStorage } from "./comercio.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([ComercioTypeOrmModel]),
        CategoriaTypeOrmModule
    ],
    providers: [
        { provide: ComercioStorage, useClass: ComercioTypeOrmStorage },
        ComercioTypeOrmStorage
    ],
    exports: [
        ComercioStorage,
        ComercioTypeOrmStorage
    ]
})
export class ComercioTypeOrmModule { }