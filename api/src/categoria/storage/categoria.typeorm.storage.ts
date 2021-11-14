import { InjectRepository } from "@nestjs/typeorm";
import { ItemCategoriaTypeOrmStorage } from "src/item-categoria/storage/item-categoria.typeorm.storage";
import { EntityManager, Repository } from "typeorm";
import { CategoriaFilter } from "../data/categoria-filter";
import { UpdateCategoriaData } from "../data/update-categoria.data";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaStorage } from "./categoria.storage";
import { CategoriaTypeOrmModel } from "./categoria.typeorm.model";

export class CategoriaTypeOrmStorage extends CategoriaStorage {
    
    constructor(
        @InjectRepository(CategoriaTypeOrmModel)
        private readonly repository: Repository<CategoriaTypeOrmModel>,
        private readonly itemCategoriaStorage: ItemCategoriaTypeOrmStorage
    ) {
        super();
    }

    public getRawListByIdList(idList: string[], manager?:EntityManager): Promise<CategoriaTypeOrmModel[]>{
        if(manager){
            return manager.findByIds(this.repository.target, idList);
        }
        else{
            return this.repository.findByIds(idList);
        }
    }

    public async exists(id: string): Promise<boolean> {
        const count = await this.repository.count({id: Number(id)});

        return count > 0;
    }

    public async isFromComercio(id: string, comercioId: string): Promise<boolean> {
        const model = await this.repository.findOne(id, {relations: ['comercio']});

        return (model.comercio.id.toString() == comercioId);
    }

    public async remove(id: string, manager?:EntityManager): Promise<void> {
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

    public toEntity(model: CategoriaTypeOrmModel): Categoria{
        return new Categoria(model.id.toString(), model.comercio.id.toString(), model.nombre);
    }

    private async _remove(id: string, manager: EntityManager){
        await this.itemCategoriaStorage.removeByCategoria(id, manager);
        
        const model = await manager.findOne(this.repository.target, id);

        await manager.remove(model);
    }

    private findAllWithFilter(filter: CategoriaFilter, manager?: EntityManager) {
        const query = (manager ? 
            manager.createQueryBuilder<CategoriaTypeOrmModel>(this.repository.target, 'categoria') :
            this.repository.createQueryBuilder('categoria'))
            .select();

        if (filter.ids) {
            query.andWhereInIds(filter.ids);
        }

        if (filter.urlComercio) {
            query.leftJoin('categoria.comercio', 'comercio')
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