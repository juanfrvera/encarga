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

    public removeRaw(model: ItemCategoriaTypeOrmModel, manager?: EntityManager): Promise<void>{

    }

    public removeByCategoria(categoriaId: string, manager?: EntityManager): Promise<void>{

    }

    public removeByItem(itemId: string, manager?: EntityManager): Promise<void>{

    }

    public toEntity(model: ItemCategoriaTypeOrmModel) : ItemCategoria{
        return new ItemCategoria(
            model.id.toString(), model.item.id.toString(), model.categoria.id.toString(), model.orden);
    }
}