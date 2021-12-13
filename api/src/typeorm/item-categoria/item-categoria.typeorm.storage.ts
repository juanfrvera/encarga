import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { CategoriaTypeOrmModel } from "src/typeorm/categoria/categoria.typeorm.model";
import { CategoriaTypeOrmStorage } from "src/typeorm/categoria/categoria.typeorm.storage";
import { ItemTypeOrmModel } from "src/typeorm/item/item.typeorm.model";
import { ItemTypeOrmStorage } from "../item/item.typeorm.storage";
import { EntityManager, FindOneOptions, In, Repository } from "typeorm";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";
import { ItemCategoriaStorage } from "src/item-categoria/item-categoria.storage";
import { ItemCategoriaTypeOrmModel } from "./item-categoria.typeorm.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ItemCategoriaTypeOrmStorage extends ItemCategoriaStorage {
    constructor(
        @InjectRepository(ItemCategoriaTypeOrmModel)
        private readonly repository: Repository<ItemCategoriaTypeOrmModel>,
        private readonly itemStorage: ItemTypeOrmStorage,
        private readonly categoriaStorage: CategoriaTypeOrmStorage
    ) {
        super();
    }

    public async create(itemId: string, categoriaId: string, order: number, transaction?: TransactionProxy): Promise<ItemCategoria> {
        const itemModel = await this.itemStorage.getModel(itemId, transaction);
        const categoriaModel = await this.categoriaStorage.getModel(categoriaId, transaction);

        // TODO: asegurar que el obtener el orden no sea una operación "dirty"
        // es decir que si se hace desde dos lugares a la vez, que no queden mal los ordenes (duplicados)    
        let model = new ItemCategoriaTypeOrmModel();

        model.item = itemModel;
        model.categoria = categoriaModel;
        model.order = order;

        if (transaction) {
            model = await transaction.save(model);
        }
        else {
            model = await this.repository.save(model);
        }

        return this.toEntity(model);
    }

    public async deleteById(id: string, transaction?: TransactionProxy): Promise<void> {
        const options: FindOneOptions = {
            where: { id }
        }

        if (transaction) {
            const model = await transaction.findOne<ItemCategoriaTypeOrmModel>(this.repository.target, options);

            await transaction.remove(model);
        }
        else {
            const model = await this.repository.findOne(id, options);

            await this.repository.remove(model);
        }
    }

    public async deleteByCategoriaId(categoriaId: string, transaction?: TransactionProxy): Promise<void> {
        if (transaction) {
            const list = await transaction.find<ItemCategoriaTypeOrmModel>(this.repository.target,
                { where: { categoria: { id: categoriaId } } });

            await transaction.remove(list);
        }
        else {
            const list = await this.repository.find({ where: { categoria: { id: categoriaId } } });

            await this.repository.remove(list);
        }
    }

    public async deleteByItemId(itemId: string, transaction?: TransactionProxy): Promise<void> {
        if (transaction) {
            const list = await transaction.find<ItemCategoriaTypeOrmModel>(this.repository.target,
                { where: { item: { id: itemId } } });

            await transaction.remove(list);
        }
        else {
            const list = await this.repository.find({ where: { item: { id: itemId } } });

            await this.repository.remove(list);
        }
    }

    public async existWithItemIdAndCategoriaId(itemId: string, categoriaId: string): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                item: { id: itemId },
                categoria: { id: categoriaId }
            }
        });

        return count > 0;
    }

    public async getListByCategoriaIdListOrderByOrder(categoriaIdList: string[]): Promise<ItemCategoria[]> {
        const modelList = await this.repository
            .createQueryBuilder('itemCategoria')
            .select()
            .leftJoinAndSelect('itemCategoria.item', 'item')
            .leftJoinAndSelect('itemCategoria.categoria', 'categoria')
            .where('categoria.id IN (:...categoriaIdList)', { categoriaIdList })
            .orderBy('itemCategoria.orden')
            .getMany();

        return modelList.map(model => this.toEntity(model));
    }

    public async getListByItemId(itemId: string): Promise<ItemCategoria[]> {
        const modelList = await this.repository.find({
            where: {
                item: { id: itemId }
            }
        });

        return modelList.map(m => this.toEntity(m));
    }

    public async getMinimumOrderByCategoriaId(categoriaId: string): Promise<number> {
        const query = this.repository.createQueryBuilder('itemCategoria');

        query.leftJoin('itemCategoria.categoria', 'categoria');

        query.where('categoria.id = :categoriaId', { categoriaId });

        query.select('MIN(itemCategoria.orden)', 'minimumOrder');

        const result = await query.getRawOne<{ minimumOrder: number }>();

        return result.minimumOrder;
    }

    public async removeModel(model: ItemCategoriaTypeOrmModel, manager?: EntityManager): Promise<void> {
        if (manager) {
            await manager.remove(model);
        }
        else {
            await this.repository.remove(model);
        }
    }

    public toEntity(model: ItemCategoriaTypeOrmModel): ItemCategoria {
        return new ItemCategoria(
            model.id.toString(), model.item.id.toString(), model.categoria.id.toString(), model.order);
    }
}