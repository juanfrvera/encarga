import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { Categoria } from "src/shared/categoria/entities/categoria.entity";
import { ComercioCreationData } from "./data/comercio.creation.data";
import { Comercio } from "./entities/comercio.entity";

export abstract class ComercioStorage{
    public abstract create(data: ComercioCreationData, transaction?: TransactionProxy): Promise<Comercio>;
    public abstract getByUrl(url: string): Promise<Comercio>;
    public abstract setDefaultCategoria(entity: Comercio, categoria : Categoria, transaction? : TransactionProxy)
    : Promise<Comercio>;
}