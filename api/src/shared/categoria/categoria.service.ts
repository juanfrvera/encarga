import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { BaseStorage } from 'src/base/storage/base.storage';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { CategoriaCreationData } from './data/categoria.creation.data';
import { UpdateCategoriaData } from './data/update-categoria.data';
import { Categoria } from './entities/categoria.entity';
import { CategoriaNotFoundError } from './error/categoria-not-found.error';
import { CategoriaStorage } from './categoria.storage';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly storage: CategoriaStorage,
        private readonly baseStorage: BaseStorage,
        private readonly itemCategoriaService: ItemCategoriaService
    ) { }

    public create(data: CategoriaCreationData, transaction?: TransactionProxy) {
        return this.storage.create(data, transaction);
    }

    public getListByComercioIdNotEmpty(comercioId: string): Promise<Array<Categoria>> {
        return this.storage.getListByComercioIdNotEmpty(comercioId);
    }

    public async remove(id: string): Promise<void> {
        if (await this.storage.exists(id)) {
            await this.baseStorage.startTransaction(async transaction => {
                await this.storage.remove(id, transaction);
                await this.itemCategoriaService.removeByCategoria(id, transaction);
            });
        }
        else {
            throw new CategoriaNotFoundError();
        }
    }

    public async update(id: string, data: UpdateCategoriaData): Promise<Categoria> {
        if (await this.storage.exists(id)) {
            return this.storage.update(id, data);
        }
        else {
            throw new CategoriaNotFoundError();
        }
    }
}
