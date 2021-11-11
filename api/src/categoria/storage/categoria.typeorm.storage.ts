import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateCategoriaData } from "../data/update-categoria.data";
import { CategoriaStorage } from "./categoria.storage";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";

export class CategoriaTypeOrmStorage extends CategoriaStorage {
    constructor(
        @InjectRepository(CategoriaTypeOrmModel)
        private readonly repository: Repository<CategoriaTypeOrmModel>
    ) {
        super();
    }

    public async update(id: string, data: UpdateCategoriaData) {
        const original = await this.repository.findOneOrFail(id);

        original.nombre = data.nombre ?? original.nombre;

        await this.repository.save(original);

        return original;
    }
}