import { Injectable } from '@nestjs/common';
import { BaseStorage } from 'src/base/storage/base.storage';
import { ComercioCreationData } from './data/comercio.creation.data';
import { Comercio } from './entities/comercio.entity';
import { ComercioStorage } from './comercio.storage';
import { ComercioNotFoundError } from './error/comercio-not-found.error';
import { NoComercioUrlError } from './error/no-comercio-url.error';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ComercioService {
    constructor(
        private readonly storage: ComercioStorage,
        private readonly baseStorage: BaseStorage,
        private readonly categoriaService: CategoriaService
    ) { }

    public async create(data: ComercioCreationData): Promise<Comercio> {
        return this.baseStorage.startTransaction(async transaction => {
            // Create comercio
            let entity = await this.storage.create(data, transaction);

            // Create default category pointing to comercio
            const categoriaDefault = await this.categoriaService.create(
                {
                    nombre: 'default'
                },
                transaction);

            // Assign created default category to comercio
            entity = await this.storage.setDefaultCategoria(entity, categoriaDefault, transaction);

            return entity;
        });
    }

    public getByUrl(url: string): Promise<Comercio> {
        return this.storage.getByUrl(url);
    }

    public async getByUrlOrThrow(url: string): Promise<Comercio> {
        if (!url) {
            throw new NoComercioUrlError();
        }

        const comercio = await this.getByUrl(url);

        if (comercio) {
            return comercio;
        }
        else {
            throw new ComercioNotFoundError();
        }
    }

    public getListByIdList(idList: Array<string>): Promise<Array<Comercio>> {
        return this.storage.getListByIdList(idList);
    }
}
