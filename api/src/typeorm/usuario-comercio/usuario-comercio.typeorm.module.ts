import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioComercioStorage } from "src/usuario-comercio/usuario-comercio.storage";
import { UsuarioComercioTypeOrmModel } from "./usuario-comercio.typeorm.model";
import { UsuarioComercioTypeOrmStorage } from "./usuario-comercio.typeorm.storage";

@Module({
    imports:[
        TypeOrmModule.forFeature([UsuarioComercioTypeOrmModel])
    ],
    providers: [
        {provide: UsuarioComercioStorage, useClass: UsuarioComercioTypeOrmStorage}
    ],
    exports:[
        UsuarioComercioStorage
    ]
})
export class UsuarioComercioTypeOrmModule {}