import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { BaseTypeOrmStorage } from "src/base/storage/base.typeorm.storage";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { CategoriaTypeOrmStorage } from "../categoria/categoria.typeorm.storage";
import { Repository } from "typeorm";
import { ComercioCreationData } from "src/comercio/data/comercio.creation.data";
import { Comercio } from "src/comercio/entities/comercio.entity";
import { ComercioStorage } from "src/comercio/comercio.storage";
import { ComercioTypeOrmModel } from "./comercio.typeorm.model";

export class ComercioTypeOrmStorage extends BaseTypeOrmStorage<ComercioTypeOrmModel> implements ComercioStorage{
    constructor(
        @InjectRepository(ComercioTypeOrmModel)
        readonly repository: Repository<ComercioTypeOrmModel>,
        private readonly categoriaStorage: CategoriaTypeOrmStorage
    ){
        super(repository);
    }

    public async create(data: ComercioCreationData, transaction?: TransactionProxy): Promise<Comercio> {
        let model = new ComercioTypeOrmModel();

        model.url = data.url;

        if(transaction){
            model = await transaction.save(model);
        }
        else{
            model = await this.repository.save(model);
        }

        return this.toEntity(model);
    }

    public async getByUrl(url: string): Promise<Comercio> {
        const model = await this.repository.findOne({where: {url}});

        return this.toEntity(model);
    }

    public getModel(id: string, transaction?: TransactionProxy): Promise<ComercioTypeOrmModel>{
        if(transaction){
            return transaction.findOne<ComercioTypeOrmModel>(this.repository.target, id);
        }
        else{
            return this.repository.findOne(id);
        }
    }

    public async setDefaultCategoria(entity: Comercio, categoria : Categoria, transaction? : TransactionProxy)
    : Promise<Comercio>{
        let model = await this.getModel(entity.id, transaction);
        const categoriaModel = await this.categoriaStorage.getModel(categoria.id, transaction);

        model.categoriaDefault = categoriaModel;

        if(transaction){
            model = await transaction.save(model);
        }
        else{
            model = await this.repository.save(model);
        }

        return this.toEntity(model);
    }


    public toEntity(model: ComercioTypeOrmModel): Comercio{
        return new Comercio(model.id.toString(), model.url);
    }
}