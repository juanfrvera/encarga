import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioStorage } from "src/usuario/usuario.storage";
import { Repository } from "typeorm";
import { UsuarioTypeOrmModel } from "./usuario.typeorm.model";

export class UsuarioTypeOrmStorage extends UsuarioStorage{
    constructor(
        @InjectRepository(UsuarioTypeOrmModel)
        private readonly repository: Repository<UsuarioTypeOrmModel>
    ){
        super();
    }

    public getByIdWithUsuarioComercioList(usuarioId: string): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    public getByMail(mail: string): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }

}