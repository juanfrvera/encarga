import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { EntityManager, Repository } from "typeorm";
import { ItemCreationData } from "src/item/data/item.creation.data";
import { ItemUpdateData } from "src/item/data/item.update.data";
import { Item } from "src/item/entities/item.entity";
import { ItemStorage } from "src/item/item.storage";
import { ItemTypeOrmModel } from "./item.typeorm.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ItemTypeOrmStorage extends ItemStorage {
    constructor(
        @InjectRepository(ItemTypeOrmModel)
        private readonly repository: Repository<ItemTypeOrmModel>,
    ) {
        super();
    }

    public async create(data: ItemCreationData, manager?: EntityManager): Promise<Item> {
        const _create = async (mng: EntityManager) => {
            const preItem = new ItemTypeOrmModel();

            preItem.titulo = data.titulo;
            preItem.precio = data.precio;
            preItem.descripcion = data.descripcion;

            // Guardar para obtener un id
            const item = await mng.save(preItem);

            return mng.save(item);
        };

        let model : ItemTypeOrmModel;

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
        const count = await this.repository.count({id: Number(id)});

        return count > 0;
    }

    public async get(id: string): Promise<Item> {
        const model = await this.getModel(id);

        return this.toEntity(model);
    }

    public getModel(id: string, transaction? : TransactionProxy): Promise<ItemTypeOrmModel>{
        if(transaction){
            return transaction.findOne(this.repository.target, id);
        }
        else{
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

    public async update(id: string, data: ItemUpdateData) : Promise<Item>{
        // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
        // Si falla, se cancela la transaccion y no queda guardado el item
        const model = await this.repository.manager.transaction(async manager => {
            const original = await manager.findOneOrFail(this.repository.target, id) as ItemTypeOrmModel;

            original.titulo = data.titulo ?? original.titulo;
            original.descripcion = data.descripcion ?? original.descripcion;
            original.precio = data.precio ?? original.precio;

            await manager.save(original);

            return original;
        });

        return this.toEntity(model);
    }

    public toEntity(model: ItemTypeOrmModel) : Item{
        return new Item(model.id.toString(), model.titulo, model.precio, model.descripcion);
    }

    private async _remove(id: string, transaction?: TransactionProxy){
        const model = await transaction.findOne(this.repository.target, id);

        await transaction.remove(model);
    }
}