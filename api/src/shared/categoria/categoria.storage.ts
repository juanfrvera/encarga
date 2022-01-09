import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { CategoriaCreate } from "./data/categoria.create";
import { CategoriaUpdate } from "./data/categoria.update";
import { Categoria } from "./entities/categoria.entity";

export abstract class CategoriaStorage {
    public abstract create(data: CategoriaCreate, transaction?: TransactionProxy): Promise<Categoria>;
    public abstract exist(id: string): Promise<boolean>;
    public abstract getListByComercioId(comercioId: string): Promise<Array<Categoria>>;
    public abstract getListByComercioIdNotEmpty(comercioId: string): Promise<Array<Categoria>>;
    public abstract getListByIdList(idList: Array<String>): Promise<Array<Categoria>>;
    public abstract remove(id: string, transaction?: TransactionProxy): Promise<void>;
    public abstract update(data: CategoriaUpdate): Promise<Categoria>;
}