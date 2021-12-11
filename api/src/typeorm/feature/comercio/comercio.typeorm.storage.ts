import { InjectRepository } from "@nestjs/typeorm";
import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { Repository } from "typeorm";
import { ComercioCreationData } from "src/shared/comercio/data/comercio.creation.data";
import { Comercio } from "src/shared/comercio/entities/comercio.entity";
import { ComercioStorage } from "src/shared/comercio/comercio.storage";
import { ComercioTypeOrmModel } from "./comercio.typeorm.model";

export class ComercioTypeOrmStorage extends ComercioStorage {
    constructor(
        @InjectRepository(ComercioTypeOrmModel)
        private readonly repository: Repository<ComercioTypeOrmModel>,
    ) {
        super();
    }

    public async create(data: ComercioCreationData, transaction?: TransactionProxy): Promise<Comercio> {
        let model = new ComercioTypeOrmModel();

        model.url = data.url;

        if (transaction) {
            model = await transaction.save(model);
        }
        else {
            model = await this.repository.save(model);
        }

        return this.toEntity(model);
    }

    public async getById(id: string): Promise<Comercio> {
        const model = await this.repository.findOne(id);

        return this.toEntity(model);
    }

    public async getByUrl(url: string): Promise<Comercio> {
        const model = await this.repository.findOne({ where: { url } });

        return this.toEntity(model);
    }

    public async getListByIdList(idList: Array<string>): Promise<Array<Comercio>> {
        const modelList = await this.repository.findByIds(idList);

        return modelList.map(m => this.toEntity(m));
    }

    public getModel(id: string, transaction?: TransactionProxy): Promise<ComercioTypeOrmModel> {
        if (transaction) {
            return transaction.findOne<ComercioTypeOrmModel>(this.repository.target, id);
        }
        else {
            return this.repository.findOne(id);
        }
    }

    public toEntity(model: ComercioTypeOrmModel): Comercio {
        return new Comercio(
            model.id.toString(),
            model.url
        );
    }
}