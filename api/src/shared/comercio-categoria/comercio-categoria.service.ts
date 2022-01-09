import { Injectable } from "@nestjs/common";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { BaseStorage } from "src/base/storage/base.storage";
import { CategoriaService } from "../categoria/categoria.service";
import { ComercioCategoria } from "./comercio-categoria.entity";
import { ComercioCategoriaStorage } from "./comercio-categoria.storage";

@Injectable()
export class ComercioCategoriaService {
    constructor(
        private readonly storage: ComercioCategoriaStorage,
        private readonly baseStorage: BaseStorage,
        private readonly categoriaService: CategoriaService,
    ) { }

    public countByComercioId(comercioId: string): Promise<number> {
        return this.storage.countByComercioId(comercioId);
    }

    public create(comercioId: string, categoriaId: string, transaction?: TransactionProxy): Promise<ComercioCategoria> {
        return this.storage.create(comercioId, categoriaId, transaction);
    }

    public async createDefaultForComercioId(comercioId: string, transaction?: TransactionProxy): Promise<void> {
        const _create = async (transaction: TransactionProxy) => {
            // Create default category pointing to comercio
            const categoriaDefault = await this.categoriaService.create(
                {
                    name: 'default'
                },
                transaction
            );

            await this.storage.createDefault(comercioId, categoriaDefault.id, transaction);
        }

        if (transaction) {
            await _create(transaction);
        }
        else {
            await this.baseStorage.startTransaction(async transaction => {
                await _create(transaction);
            });
        }
    }

    public deleteByCategoriaId(categoriaId: string, transaction: TransactionProxy): Promise<void>{
        return this.storage.deleteByCategoriaId(categoriaId, transaction);
    }

    public getDefaultForComercioId(comercioId: string): Promise<ComercioCategoria> {
        return this.storage.getDefaultForComercioId(comercioId);
    }

    public getListByComercioId(comercioId: string): Promise<Array<ComercioCategoria>> {
        return this.storage.getListByComercioId(comercioId);
    }

    public isCategoriaFromComercio(categoriaId: string, comercioId: string): Promise<boolean> {
        return this.storage.existWithCategoriaIdAndComercioId(categoriaId, comercioId);
    }
}