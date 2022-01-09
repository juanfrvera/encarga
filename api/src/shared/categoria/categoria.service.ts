import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { CategoriaCreate } from './data/categoria.create';
import { CategoriaUpdate } from './data/categoria.update';
import { Categoria } from './entities/categoria.entity';
import { CategoriaNotFoundError } from './error/categoria-not-found.error';
import { CategoriaStorage } from './categoria.storage';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly storage: CategoriaStorage,
    ) { }

    public create(data: CategoriaCreate, transaction?: TransactionProxy) {
        return this.storage.create(data, transaction);
    }

    public async deleteById(id: string, transaction?: TransactionProxy): Promise<void> {
        await this.existByIdOrThrow(id);
        await this.storage.deleteById(id, transaction);
    }

    public async existByIdOrThrow(id: string, transaction?: TransactionProxy): Promise<boolean> {
        const exists = await this.storage.existById(id, transaction);

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

    public async update(data: CategoriaUpdate): Promise<Categoria> {
        if (await this.storage.existById(data.id)) {
            return this.storage.update(data);
        }
        else {
            throw new CategoriaNotFoundError();
        }
    }
}
