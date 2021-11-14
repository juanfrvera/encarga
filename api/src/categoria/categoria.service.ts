import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/base/proxy/transaction.proxy';
import { CategoriaCreationData } from './data/categoria.creation.data';
import { UpdateCategoriaData } from './data/update-categoria.data';
import { Categoria } from './entities/categoria.entity';
import { CategoriaNotFoundError } from './error/categoria-not-found.error';
import { CategoriaStorage } from './storage/categoria.storage';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly storage: CategoriaStorage
    ) { }

    public create(data: CategoriaCreationData, transaction? : TransactionProxy){
        return this.storage.create(data, transaction);
    }

    public async listExistAndBelongsToComercio(categoriaIdList: string[], comercioId: string) {
        for (const categoriaId of categoriaIdList) {
            if(!await this.storage.exists(categoriaId)){
                return false;
            }

            if(!await this.storage.isFromComercio(categoriaId, comercioId)){
                return false;
            }
        }

        return true;
    }

    public async remove(id: string) : Promise<void> {
        if(await this.storage.exists(id)){
            await this.storage.remove(id);
        }
        else{
            throw new CategoriaNotFoundError();
        }
    }

    public async update(id: string, data: UpdateCategoriaData): Promise<Categoria> {
        if(await this.storage.exists(id)){
            return this.storage.update(id, data);
        }
        else{
            throw new CategoriaNotFoundError();
        }
    }
}
