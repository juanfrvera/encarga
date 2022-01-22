import { Module } from "@nestjs/common";
import { BaseModule } from "src/base/base.module";
import { ComercioCategoriaTypeOrmModule } from "src/typeorm/feature/comercio-categoria/comercio-categoria.typeorm.module";
import { CategoriaModule } from "../categoria/categoria.module";
import { ComercioCategoriaService } from "./comercio-categoria.service";

@Module({
    imports: [
        ComercioCategoriaTypeOrmModule,
        BaseModule,
        CategoriaModule
    ],
    providers: [ComercioCategoriaService],
    exports: [ComercioCategoriaService]
})
export class ComercioCategoriaModule { }