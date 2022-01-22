import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { EntityManager, Repository } from "typeorm";
import { CategoriaCreate } from "../../../shared/categoria/data/categoria.create";
import { CategoriaUpdate } from "../../../shared/categoria/data/categoria.update";
import { Categoria } from "../../../shared/categoria/entities/categoria.entity";
import { CategoriaStorage } from "../../../shared/categoria/categoria.storage";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";

export class CategoriaTypeOrmStorage extends CategoriaStorage {
    constructor(
        @InjectRepository(CategoriaTypeOrmModel)
        private readonly repository: Repository<CategoriaTypeOrmModel>
    ) {
        super();
    }

    public async create(data: CategoriaCreate, transaction?: TransactionProxy): Promise<Categoria> {
        let model = new CategoriaTypeOrmModel();

        model.nombre = data.name;

        if (transaction) {
            model = await transaction.save(model);
        }
        else {
            model = await this.repository.save(model);
        }

        return this.toEntity(model);
    }

    public async deleteById(id: string, manager?: EntityManager): Promise<void> {
        if (manager) {
            return this._deleteById(id, manager);
        }
        else {
            return this.repository.manager.transaction(async newManager => {
                return this._deleteById(id, newManager);
            });
        }
    }

    public async existById(id: string, transaction?: TransactionProxy): Promise<boolean> {
        let count = 0;

        if (transaction) {
            count = await transaction.count<CategoriaTypeOrmModel>(this.repository.target, { where: { id } })
        }
        else {
            count = await this.repository.count({ id: Number(id) });
        }

        return count > 0;
    }

    public async getListByComercioId(comercioId: string): Promise<Categoria[]> {
        const query = this.repository.createQueryBuilder('categoria').select();

        query.leftJoin('categoria.comercioCategoriaList', 'comercioCategoria');
        query.leftJoin('comercioCategoria.comercio', 'comercio');

        query.where('comercio.id = :comercioId', { comercioId });

        const modelList = await query.getMany();

        return modelList.map(m => this.toEntity(m));
    }


    public async getListByComercioIdNotEmpty(comercioId: string): Promise<Categoria[]> {
        const query = this.repository.createQueryBuilder('categoria').select();

        query.leftJoin('categoria.itemCategoriaList', 'itemcategoria');
        query.leftJoin('categoria.comercioCategoriaList', 'comercioCategoria');
        query.leftJoin('comercioCategoria.comercio', 'comercio');

        query.where('comercio.id = :comercioId', { comercioId });
        query.andWhere('itemcategoria IS NOT NULL');

        const modelList = await query.getMany();

        return modelList.map(m => this.toEntity(m));
    }

    public async getListByIdList(idList: String[]): Promise<Categoria[]> {
        const modelList = await this.repository.findByIds(idList);

        return modelList.map(m => this.toEntity(m));
    }

    public getModel(id: string, transaction?: TransactionProxy): Promise<CategoriaTypeOrmModel> {
        if (transaction) {
            return transaction.findOne(this.repository.target, id);
        }
        else {
            return this.repository.findOne(id);
        }
    }

    public getModelListByIdList(idList: string[], transaction?: TransactionProxy): Promise<CategoriaTypeOrmModel[]> {
        if (transaction) {
            return transaction.findByIds(this.repository.target, idList);
        }
        else {
            return this.repository.findByIds(idList);
        }
    }

    public async update(data: CategoriaUpdate) {
        let model = await this.repository.findOneOrFail(data.id);

        if (data.name != undefined) {
            model.nombre = data.name;
        }

        model = await this.repository.save(model);

        return this.toEntity(model);
    }

    public toEntity(model: CategoriaTypeOrmModel): Categoria {
        return new Categoria(model.id.toString(), model.nombre);
    }

    private async _deleteById(id: string, transaction: TransactionProxy) {
        const model = await transaction.findOne(this.repository.target, id);

        await transaction.remove(model);
    }
}