import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { EntityManager, Repository } from "typeorm";
import { CategoriaFilter } from "../../shared/categoria/data/categoria-filter";
import { CategoriaCreationData } from "../../shared/categoria/data/categoria.creation.data";
import { UpdateCategoriaData } from "../../shared/categoria/data/update-categoria.data";
import { Categoria } from "../../shared/categoria/entities/categoria.entity";
import { CategoriaStorage } from "../../shared/categoria/categoria.storage";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";

export class CategoriaTypeOrmStorage extends CategoriaStorage {
    constructor(
        @InjectRepository(CategoriaTypeOrmModel)
        private readonly repository: Repository<CategoriaTypeOrmModel>
    ) {
        super();
    }

    public async create(data: CategoriaCreationData, transaction?: TransactionProxy): Promise<Categoria> {
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

    public async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({ id: Number(id) });

        return count > 0;
    }

    public async remove(id: string, manager?: EntityManager): Promise<void> {
        if (manager) {
            return this._remove(id, manager);
        }
        else {
            return this.repository.manager.transaction(async newManager => {
                return this._remove(id, newManager);
            });
        }
    }

    public async update(id: string, data: UpdateCategoriaData) {
        let model = await this.repository.findOneOrFail(id);

        model.nombre = data.nombre ?? model.nombre;

        model = await this.repository.save(model);

        return this.toEntity(model);
    }

    public toEntity(model: CategoriaTypeOrmModel): Categoria {
        return new Categoria(model.id.toString(), model.nombre);
    }

    private async _remove(id: string, transaction: TransactionProxy) {
        const model = await transaction.findOne(this.repository.target, id);

        await transaction.remove(model);
    }

    private findAllWithFilter(filter: CategoriaFilter, transaction?: TransactionProxy) {
        const query = (transaction ?
            transaction.createQueryBuilder<CategoriaTypeOrmModel>(this.repository.target, 'categoria') :
            this.repository.createQueryBuilder('categoria'))
            .select();

        if (filter.ids) {
            query.andWhereInIds(filter.ids);
        }

        if (filter.urlComercio) {
            query.leftJoin('categoria.comercioCategoriaList', 'comercioCategoria')
                .leftJoin('comercioCategoria.comercio', 'comercio')
                .andWhere('comercio.url = :urlComercio', { urlComercio: filter.urlComercio });
        }

        if (filter.vacias !== undefined) {
            if (filter.vacias) {
                query.leftJoin('categoria.itemCategorias', 'itemcategoria')
                    .andWhere('itemcategoria IS NULL');
            }
            else {
                query.leftJoin('categoria.itemCategorias', 'itemcategoria')
                    .andWhere('itemcategoria IS NOT NULL');
            }
        }

        return query.getMany();
    }
}