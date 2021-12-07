import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { EntityManager, Repository } from "typeorm";
import { ItemCreationData } from "src/item/data/item.creation.data";
import { ItemUpdateData } from "src/item/data/item.update.data";
import { Item } from "src/item/entities/item.entity";
import { ItemStorage } from "src/item/item.storage";
import { ItemTypeOrmModel } from "./item.typeorm.model";
import { Injectable } from "@nestjs/common";
import { ItemFilter } from "src/item/data/item.filter";

@Injectable()
export class ItemTypeOrmStorage extends ItemStorage {
    constructor(
        @InjectRepository(ItemTypeOrmModel)
        private readonly repository: Repository<ItemTypeOrmModel>,
    ) {
        super();
    }

    public countByComercio(comercioId: string): Promise<number> {
        const query = this.repository.createQueryBuilder('item').select();

        query.leftJoin('item.itemCategoriaList', 'itemCategoria');
        query.leftJoin('itemCategoria.categoria', 'categoria');
        query.leftJoin('categoria.comercioCategoriaList', 'comercioCategoria');
        query.leftJoin('comercioCategoria.comercio', 'comercio');

        query.where('comercio.id = :comercioId', { comercioId });

        return query.getCount();
    }

    public async create(data: ItemCreationData, manager?: EntityManager): Promise<Item> {
        const _create = async (mng: EntityManager) => {
            const preItem = new ItemTypeOrmModel();

            preItem.name = data.titulo;
            preItem.price = data.precio;
            preItem.description = data.descripcion;

            // Guardar para obtener un id
            const item = await mng.save(preItem);

            return mng.save(item);
        };

        let model: ItemTypeOrmModel;

        if (manager) {
            model = await _create(manager);
        }
        else {
            // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
            // Si falla, se cancela la transaccion y no queda guardado el item
            model = await this.repository.manager.transaction(myManager => {
                return _create(myManager);
            });
        }

        return this.toEntity(model);
    }

    public async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({ id: Number(id) });

        return count > 0;
    }

    public async get(id: string): Promise<Item> {
        const model = await this.getModel(id);

        return this.toEntity(model);
    }

    public async getList(filter: ItemFilter): Promise<Item[]> {
        const query = this.repository.createQueryBuilder('item').select();

        if (filter) {
            if (filter.categoriaId) {
                query.leftJoin('item.itemCategoriaList', 'itemCategoria');
                query.leftJoin('itemCategoria.categoria', 'categoria');

                query.andWhere('categoria.id = :categoriaId', { categoriaId: filter.categoriaId });
            }
            if (filter.idList) {
                query.andWhere('item.id IN (:...idList)', { idList: filter.idList });
            }
        }

        const modelList = await query.getMany();

        return modelList.map(m => this.toEntity(m));
    }

    public async getListByComercio(comercioId: string): Promise<Array<Item>> {
        const query = this.repository.createQueryBuilder('item').select();

        query.leftJoin('item.itemCategoriaList', 'itemCategoria');
        query.leftJoin('itemCategoria.categoria', 'categoria');
        query.leftJoin('categoria.comercioCategoriaList', 'comercioCategoria');
        query.leftJoin('comercioCategoria.comercio', 'comercio');

        query.where('comercio.id = :comercioId', { comercioId });

        const modelList = await query.getMany();

        return modelList.map(m => this.toEntity(m));
    }

    public getModel(id: string, transaction?: TransactionProxy): Promise<ItemTypeOrmModel> {
        if (transaction) {
            return transaction.findOne(this.repository.target, id);
        }
        else {
            return this.repository.findOne(id);
        }
    }

    public async remove(id: string, transaction?: TransactionProxy): Promise<void> {
        if (transaction) {
            return this._remove(id, transaction);
        }
        else {
            return this.repository.manager.transaction(async newManager => {
                return this._remove(id, transaction);
            });
        }
    }

    public async update(id: string, data: ItemUpdateData): Promise<Item> {
        // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
        // Si falla, se cancela la transaccion y no queda guardado el item
        const model = await this.repository.manager.transaction(async manager => {
            const original = await manager.findOneOrFail(this.repository.target, id) as ItemTypeOrmModel;

            original.name = data.name ?? original.name;
            original.description = data.description ?? original.description;
            original.price = data.price ?? original.price;

            await manager.save(original);

            return original;
        });

        return this.toEntity(model);
    }

    public toEntity(model: ItemTypeOrmModel): Item {
        return new Item(model.id.toString(), model.name, model.price, model.description);
    }

    private async _remove(id: string, transaction?: TransactionProxy) {
        const model = await transaction.findOne(this.repository.target, id);

        await transaction.remove(model);
    }
}