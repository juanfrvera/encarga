import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { BaseTypeOrmStorage } from "src/base/storage/base.typeorm.storage";
import { Repository } from "typeorm";
import { ComercioCreationData } from "../data/comercio.creation.data";
import { Comercio } from "../entities/comercio.entity";
import { ComercioStorage } from "./comercio.storage";
import { ComercioTypeOrmModel } from "./comercio.typeorm.model";

export class ComercioTypeOrmStorage extends BaseTypeOrmStorage<ComercioTypeOrmModel> implements ComercioStorage{
    constructor(
        @InjectRepository(ComercioTypeOrmModel)
        readonly repository: Repository<ComercioTypeOrmModel>
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

    public toEntity(model: ComercioTypeOrmModel): Comercio{
        return new Comercio(model.id.toString(), model.url);
    }
}