import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaTypeOrmModel } from "src/categoria/storage/categoria.typeorm.model";
import { ItemTypeOrmModel } from "src/item/storage/item.typeorm.model";
import { EntityManager, Repository } from "typeorm";
import { ItemCategoria } from "../entities/item-categoria.entity";
import { ItemCategoriaTypeOrmModel } from "./item-categoria.typeorm.model";

export class ItemCategoriaTypeOrmStorage{

    constructor(
        @InjectRepository(ItemCategoriaTypeOrmModel)
        private readonly repository : Repository<ItemCategoriaTypeOrmModel>
    ){}

    public createRaw(
        itemModel: ItemTypeOrmModel,
        categoriaModel: CategoriaTypeOrmModel,
        manager?: EntityManager): Promise<ItemCategoriaTypeOrmModel>{
            const model = new ItemCategoriaTypeOrmModel();

            model.item = itemModel;
            model.categoria = categoriaModel;
            
            if(manager){                
                return manager.save(model);
            }
            else{
                return this.repository.save(model);
            }
    }

    public async removeRaw(model: ItemCategoriaTypeOrmModel, manager?: EntityManager): Promise<void>{
        if(manager){
            await manager.remove(model);
        }
        else{
            await this.repository.remove(model);
        }
    }

    public async removeByCategoria(categoriaId: string, manager?: EntityManager): Promise<void>{
        if(manager){
            const modelList = await manager.find<ItemCategoriaTypeOrmModel>(this.repository.target,
                 {where: {categoria: {id: categoriaId}}});
            await manager.remove(modelList);
        }
        else{
            const modelList = await this.repository.find({where: {categoria: {id: categoriaId}}});
            await this.repository.remove(modelList);
        }
    }

    public async removeByItem(itemId: string, manager?: EntityManager): Promise<void>{
        if(manager){
            const modelList = await manager.find<ItemCategoriaTypeOrmModel>(this.repository.target,
                 {where: {item: {id: itemId}}});
            await manager.remove(modelList);
        }
        else{
            const modelList = await this.repository.find({where: {item: {id: itemId}}});
            await this.repository.remove(modelList);
        }
    }

    public toEntity(model: ItemCategoriaTypeOrmModel) : ItemCategoria{
        return new ItemCategoria(
            model.id.toString(), model.item.id.toString(), model.categoria.id.toString(), model.orden);
    }
}