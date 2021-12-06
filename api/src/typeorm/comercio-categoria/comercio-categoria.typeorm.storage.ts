import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ComercioCategoriaEntity } from "src/shared/comercio-categoria/comercio-categoria.entity";
import { ComercioCategoriaStorage } from "src/shared/comercio-categoria/comercio-categoria.storage";
import { Repository } from "typeorm";
import { CategoriaTypeOrmStorage } from "../categoria/categoria.typeorm.storage";
import { ComercioTypeOrmStorage } from "../comercio/comercio.typeorm.storage";
import { ComercioCategoriaTypeOrmModel } from "./comercio-categoria.typeorm.model";

@Injectable()
export class ComercioCategoriaTypeOrmStorage extends ComercioCategoriaStorage {
    constructor(
        @InjectRepository(ComercioCategoriaTypeOrmModel)
        private readonly repository: Repository<ComercioCategoriaTypeOrmModel>,
        private readonly comercioTypeOrmStorage: ComercioTypeOrmStorage,
        private readonly categoriaTypeOrmStorage: CategoriaTypeOrmStorage
    ) {
        super();
    }

    // public async setDefaultCategoria(entity: Comercio, categoria: Categoria, transaction?: TransactionProxy)
    //     : Promise<Comercio> {
    //     let model = await this.getModel(entity.id, transaction);
    //     const categoriaModel = await this.categoriaStorage.getModel(categoria.id, transaction);

    //     model.categoriaDefault = categoriaModel;

    //     if (transaction) {
    //         model = await transaction.save(model);
    //     }
    //     else {
    //         model = await this.repository.save(model);
    //     }

    //     return this.toEntity(model);
    // }

    public async createDefault(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoriaEntity> {

        const comercioModel = await this.comercioTypeOrmStorage.getModel(comercioId, transaction);
        const categoriaModel = await this.categoriaTypeOrmStorage.getModel(categoriaId, transaction);

        let model = {
            comercio: comercioModel,
            categoria: categoriaModel,
            isDefault: true
        } as ComercioCategoriaTypeOrmModel;

        model = await transaction.save(this.repository.target, model);

        return this.toEntity(model);
    }

    public async getDefaultForComercioId(comercioId: string): Promise<ComercioCategoriaEntity> {
        const model = await this.repository.findOne({
            where: {
                comercio: { id: comercioId },
                isDefault: true
            }
        });

        return this.toEntity(model);
    }

    public async getListByComercioId(comercioId: string): Promise<ComercioCategoriaEntity[]> {
        const modelList = await this.repository.find({
            where: {
                comercio: { id: comercioId }
            }
        });

        return modelList.map(m => this.toEntity(m));
    }

    private toEntity(model: ComercioCategoriaTypeOrmModel): ComercioCategoriaEntity {
        return new ComercioCategoriaEntity(
            model.comercio.id.toString(),
            model.categoria.id.toString()
        );
    }

}