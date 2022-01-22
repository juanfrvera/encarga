import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComercioCategoriaStorage } from "src/shared/comercio-categoria/comercio-categoria.storage";
import { CategoriaTypeOrmModule } from "../categoria/categoria.typeorm.module";
import { ComercioTypeOrmModule } from "../comercio/comercio.typeorm.module";
import { ComercioCategoriaTypeOrmModel } from "./comercio-categoria.typeorm.model";
import { ComercioCategoriaTypeOrmStorage } from "./comercio-categoria.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([ComercioCategoriaTypeOrmModel]),
        ComercioTypeOrmModule,
        CategoriaTypeOrmModule
    ],
    providers: [
        { provide: ComercioCategoriaStorage, useClass: ComercioCategoriaTypeOrmStorage }
    ],
    exports: [ComercioCategoriaStorage]
})
export class ComercioCategoriaTypeOrmModule { }