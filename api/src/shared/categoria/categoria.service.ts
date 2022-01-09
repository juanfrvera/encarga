import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { BaseStorage } from 'src/base/storage/base.storage';
import { ItemCategoriaService } from 'src/item-categoria/item-categoria.service';
import { CategoriaCreate } from './data/categoria.create';
import { CategoriaUpdate } from './data/categoria.update';
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

    public create(data: CategoriaCreate, transaction?: TransactionProxy) {
        return this.storage.create(data, transaction);
    }

    public async existByIdOrThrow(id: string): Promise<boolean> {
        const exists = await this.storage.exist(id);

        if (exists) {
            return true;
        }
        else {
            throw new CategoriaNotFoundError();
        }
    }

    public getListByComercioId(comercioId: string): Promise<Array<Categoria>> {
        return this.storage.getListByComercioId(comercioId);
    }

    public getListByComercioIdNotEmpty(comercioId: string): Promise<Array<Categoria>> {
        return this.storage.getListByComercioIdNotEmpty(comercioId);
    }

    public getListByIdList(idList: Array<string>): Promise<Array<Categoria>> {
        return this.storage.getListByIdList(idList);
    }

    public async remove(id: string): Promise<void> {
        await this.existByIdOrThrow(id);

        await this.baseStorage.startTransaction(async transaction => {
            await this.storage.remove(id, transaction);
            await this.itemCategoriaService.deleteByCategoriaId(id, transaction);
        });
    }

    public async update(data: CategoriaUpdate): Promise<Categoria> {
        if (await this.storage.exist(data.id)) {
            return this.storage.update(data);
        }
        else {
            throw new CategoriaNotFoundError();
        }
    }
}
