import { Injectable } from '@nestjs/common';
import { CategoriaService } from 'src/categoria/categoria.service';
import { ComercioCreationData } from './data/comercio.creation.data';
import { ComercioStorage } from './storage/comercio.storage';

@Injectable()
export class ComerciosService {
    constructor(
        private readonly storage: ComercioStorage,
        private readonly categoriaService: CategoriaService
        ){ }

    public async create(data: ComercioCreationData) {
        return this.storage.startTransaction(async transaction => {
            let entity = await this.storage.create(data, transaction);


            const categoriaDefault = await this.categoriaService.create(
                {
                    nombre: 'default',
                    comercioId: entity.id
                },
                transaction);

            entity = await this.storage.setDefaultCategoria(entity, categoriaDefault);

            return entity;
        });
    }

    getByUrl(url: string) {
        return this.repo.findOne({ where: { url }, relations });
    }
}
