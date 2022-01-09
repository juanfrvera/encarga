import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ComercioCategoria } from "src/shared/comercio-categoria/comercio-categoria.entity";
import { ComercioCategoriaStorage } from "src/shared/comercio-categoria/comercio-categoria.storage";
import { Repository } from "typeorm";
import { CategoriaTypeOrmStorage } from "../categoria/categoria.typeorm.storage";
import { ComercioTypeOrmStorage } from "../feature/comercio/comercio.typeorm.storage";
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

    public countByComercioId(comercioId: string): Promise<number> {
        return this.repository.count({ where: { comercio: { id: comercioId } } });
    }

    public async create(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoria> {

        const comercioModel = await this.comercioTypeOrmStorage.getModel(comercioId, transaction);
        const categoriaModel = await this.categoriaTypeOrmStorage.getModel(categoriaId, transaction);

        let model = {
            comercio: comercioModel,
            categoria: categoriaModel,
            isDefault: false
        } as ComercioCategoriaTypeOrmModel;

        model = await transaction.save(this.repository.target, model);

        return this.toEntity(model);
    }

    public async createDefault(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoria> {

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

    public async deleteByCategoriaId(categoriaId: string, transaction: TransactionProxy): Promise<void> {
        const modelList = await transaction.find<ComercioCategoriaTypeOrmModel>(this.repository.target, {
            where: {
                categoria: { id: categoriaId }
            }
        });

        await transaction.remove(this.repository.target, modelList);
    }

    public async existWithCategoriaIdAndComercioId(categoriaId: string, comercioId: string): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                categoria: { id: categoriaId },
                comercio: { id: comercioId }
            }
        });

        return count > 0;
    }

    public async getDefaultForComercioId(comercioId: string): Promise<ComercioCategoria> {
        const model = await this.repository.findOne({
            where: {
                comercio: { id: comercioId },
                isDefault: true
            }
        });

        return this.toEntity(model);
    }

    public async getListByComercioId(comercioId: string): Promise<ComercioCategoria[]> {
        const modelList = await this.repository.find({
            where: {
                comercio: { id: comercioId }
            }
        });

        return modelList.map(m => this.toEntity(m));
    }

    private toEntity(model: ComercioCategoriaTypeOrmModel): ComercioCategoria {
        return new ComercioCategoria(
            model.comercio.id.toString(),
            model.categoria.id.toString()
        );
    }

}