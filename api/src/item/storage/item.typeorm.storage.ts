import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { ItemCreationData } from "../data/item.creation.data";
import { ItemUpdateData } from "../data/item.update.data";
import { Item } from "../entities/item.entity";
import { ItemStorage } from "./item.storage";
import { ItemTypeOrmModel } from "./item.typeorm.model";

export class ItemTypeOrmStorage extends ItemStorage {
    constructor(
        @InjectRepository(ItemTypeOrmModel)
        private readonly repository: Repository<ItemTypeOrmModel>
    ) {
        super();
    }

    public create(data: ItemCreationData, manager?: EntityManager): Promise<Item> {
        const _create = async (mng: EntityManager) => {
            const preItem = new ItemTypeOrmModel();

            preItem.titulo = data.titulo;
            preItem.precio = data.precio;
            preItem.descripcion = data.descripcion;

            // Guardar para obtener un id
            const item = await mng.save(preItem);

            if (data.idsCategorias) {
                await this.asignarCategorias(item, data.idsCategorias, mng);
            }

            return mng.save(item);
        };


        if (manager) {
            return _create(manager);
        }
        else {
            // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
            // Si falla, se cancela la transaccion y no queda guardado el item
            return this.repository.manager.transaction(myManager => {
                return _create(myManager);
            });
        }
    }

    public update(id: string, data: ItemUpdateData) {
        // Se corre dentro de una transaccion ya que estamos preguardando y puede fallar luego
        // Si falla, se cancela la transaccion y no queda guardado el item
        return this.repository.manager.transaction(async manager => {
            const original = await manager.findOneOrFail(this.repository.target, id) as ItemTypeOrmModel;

            original.titulo = data.titulo ?? original.titulo;
            original.descripcion = data.descripcion ?? original.descripcion;
            original.precio = data.precio ?? original.precio;

            if (data.idsCategorias) {
                await this.asignarCategorias(original, data.idsCategorias, manager);
            }

            await manager.save(original);

            return original;
        });
    }

    private async asignarCategorias(item: ItemTypeOrmModel, idsCategorias: string[], manager?: EntityManager) {
        const categoriasViejas = item.itemCategorias?.map(i => i.categoria);
        const categorias = await this.categoriaService.findAllWithFilter({ ids: idsCategorias }, manager);

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
            return (await this.itemCategoriaService.create(item, c, manager));
        }));

        // ItemCategorias viejas que no son mantenidas serán eliminadas
        const itemCategoriasEliminar = item.itemCategorias?.filter(i =>
            categoriasMantenidas.findIndex(m => m.id == i.categoria.id) == -1);

        if (itemCategoriasEliminar) {
            // Eliminar item categorias no mantenidas
            for (const itemCat of itemCategoriasEliminar) {
                await this.itemCategoriaService.remove(itemCat, manager);
            }
        }

        item.itemCategorias = [...itemCategoriasMantenidas, ...itemCategoriasNuevas];
    }
}