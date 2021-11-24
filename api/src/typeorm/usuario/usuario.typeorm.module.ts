import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioStorage } from "src/usuario/usuario.storage";
import { UsuarioTypeOrmModel } from "./usuario.typeorm.model";
import { UsuarioTypeOrmStorage } from "./usuario.typeorm.storage";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioTypeOrmModel])
    ],
    providers: [
        {provide: UsuarioStorage, useClass: UsuarioTypeOrmStorage},
    ],
    exports: [
        UsuarioStorage,
    ]
})
export class UsuarioTypeOrmModule { }