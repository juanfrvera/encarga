import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { CategoriaTypeOrmStorage } from "src/categoria/storage/categoria.typeorm.storage";
import { ItemCategoriaTypeOrmStorage } from "src/item-categoria/storage/item-categoria.typeorm.storage";
import { EntityManager, Repository } from "typeorm";
import { ItemCreationData } from "../data/item.creation.data";
import { ItemUpdateData } from "../data/item.update.data";
import { Item } from "../entities/item.entity";
import { ItemStorage } from "./item.storage";
import { ItemTypeOrmModel } from "./item.typeorm.model";

export class ItemTypeOrmStorage extends ItemStorage {
    public exists(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(ItemTypeOrmModel)
        private readonly repository: Repository<ItemTypeOrmModel>,
        private readonly categoriaStorage: CategoriaTypeOrmStorage,
        private readonly itemCategoriaStorage: ItemCategoriaTypeOrmStorage
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

            if (data.categoriaIdList) {
                await this.asignarCategorias(item, data.categoriaIdList, mng);
            }

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

            if (data.categoriaIdList) {
                await this.asignarCategorias(original, data.categoriaIdList, manager);
            }

            await manager.save(original);

            return original;
        });

        return this.toEntity(model);
    }

    public toEntity(model: ItemTypeOrmModel) : Item{
        const itemCategoriaList = model.itemCategorias.map(ic => this.itemCategoriaStorage.toEntity(ic));

        return new Item(model.id.toString(), model.titulo, model.precio, model.descripcion, itemCategoriaList);
    }

    private async asignarCategorias(item: ItemTypeOrmModel, categoriaIdList: string[], manager?: EntityManager) {
        const categoriasViejas = item.itemCategorias?.map(i => i.categoria);
        const categorias = await this.categoriaStorage.getModelListByIdList(categoriaIdList, manager);

        // Categorías viejas que se mantienen
        const categoriasMantenidas =
            categoriasViejas?.filter(actual => categorias.findIndex(nueva => nueva.id == actual.id) != -1);

        // ItemCategoria viejas que se mantienen
        const itemCategoriasMantenidas = categoriasMantenidas ? item.itemCategorias.filter(i =>
            categoriasMantenidas.findIndex(c => c.id == i.categoria.id) != -1) : [];

        // Todas las categorías que no están en la lista de viejas
        const categoriasNuevas = categoriasViejas ? categorias.filter(c =>
            categoriasViejas.findIndex(vieja => c.id == vieja.id) == -1) : categorias;

        // Se crean itemCategorias nuevas
        const itemCategoriasNuevas = await Promise.all(categoriasNuevas.map(async c => {
            return (await this.itemCategoriaStorage.createModel(item, c, manager));
        }));

        // ItemCategorias viejas que no son mantenidas serán eliminadas
        const itemCategoriasEliminar = item.itemCategorias?.filter(i =>
            categoriasMantenidas.findIndex(m => m.id == i.categoria.id) == -1);

        if (itemCategoriasEliminar) {
            // Eliminar item categorias no mantenidas
            for (const itemCat of itemCategoriasEliminar) {
                await this.itemCategoriaStorage.removeModel(itemCat, manager);
            }
        }

        item.itemCategorias = [...itemCategoriasMantenidas, ...itemCategoriasNuevas];
    }

    private async _remove(id: string, manager?: EntityManager){
        // Eliminar clases de asociación
        await this.itemCategoriaStorage.removeByItem(id, manager);
        
        const model = await manager.findOne(this.repository.target, id);

        await manager.remove(model);
    }
}