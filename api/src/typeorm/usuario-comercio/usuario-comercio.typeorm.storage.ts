import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioComercio } from "src/usuario-comercio/entities/usuario-comercio.entity";
import { UsuarioComercioStorage } from "src/usuario-comercio/usuario-comercio.storage";
import { Repository } from "typeorm";
import { UsuarioComercioTypeOrmModel } from "./usuario-comercio.typeorm.model";

export class UsuarioComercioTypeOrmStorage extends UsuarioComercioStorage{
    constructor(
        @InjectRepository(UsuarioComercioTypeOrmModel)
        private readonly repository : Repository<UsuarioComercioTypeOrmModel>
    ){
        super();
    }

    public async getListByUsuario(usuarioId: string): Promise<UsuarioComercio[]> {
        const modelList = await this.repository.find({where:{usuario:{id:usuarioId}}});

        return modelList.map(m => this.toEntity(m));
    }

    private toEntity(model: UsuarioComercioTypeOrmModel): UsuarioComercio{
        return {
            comercioId: model.comercio.id.toString(),
            usuarioId: model.usuario.id.toString()
        }
    }
}