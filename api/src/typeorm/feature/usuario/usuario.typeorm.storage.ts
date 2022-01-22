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

    public get(usuarioId: string): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    public async getByMail(mail: string): Promise<Usuario> {
        const model = await this.repository.findOne({mail});

        return this.toEntity(model);
    }

    private toEntity(model: UsuarioTypeOrmModel): Usuario{
        return {
            id: model.id.toString(),
            mail: model.mail,
            password: model.password
        }
    }

}