import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ComercioCreationData } from "./data/comercio.creation.data";
import { Comercio } from "./entities/comercio.entity";

export abstract class ComercioStorage {
    public abstract create(data: ComercioCreationData, transaction?: TransactionProxy): Promise<Comercio>;
    public abstract getById(id: string): Promise<Comercio>;
    public abstract getByUrl(url: string): Promise<Comercio>;
    public abstract getListByIdList(idList: Array<string>): Promise<Array<Comercio>>;
}