import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComercioStorage } from "src/comercio/comercio.storage";
import { CategoriaTypeOrmModule } from "../categoria/categoria.typeorm.module";
import { ComercioTypeOrmModel } from "./comercio.typeorm.model";
import { ComercioTypeOrmStorage } from "./comercio.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([ComercioTypeOrmModel]),
        forwardRef(() => CategoriaTypeOrmModule)
    ],
    providers: [
        {provide: ComercioStorage, useClass: ComercioTypeOrmStorage}
    ],
    exports:[
        ComercioStorage
    ]
})
export class ComercioTypeOrmModule { }