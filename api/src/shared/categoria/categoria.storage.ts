import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { CategoriaCreate } from "./data/categoria.create";
import { CategoriaUpdate } from "./data/categoria.update";
import { Categoria } from "./entities/categoria.entity";

export abstract class CategoriaStorage {
    public abstract create(data: CategoriaCreate, transaction?: TransactionProxy): Promise<Categoria>;
    public abstract deleteById(id: string, transaction?: TransactionProxy): Promise<void>;
    public abstract existById(id: string, transaction?: TransactionProxy): Promise<boolean>;
    public abstract getListByComercioId(comercioId: string): Promise<Array<Categoria>>;
    public abstract getListByComercioIdNotEmpty(comercioId: string): Promise<Array<Categoria>>;
    public abstract getListByIdList(idList: Array<String>): Promise<Array<Categoria>>;
    public abstract update(data: CategoriaUpdate): Promise<Categoria>;
}