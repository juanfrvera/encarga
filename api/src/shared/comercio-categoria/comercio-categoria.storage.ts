import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ComercioCategoriaEntity } from "./comercio-categoria.entity";

export abstract class ComercioCategoriaStorage {
    public abstract createDefault(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoriaEntity>;
    public abstract existWithCategoriaIdAndComercioId(categoriaId: string, comercioId: string): Promise<boolean>;
    public abstract getDefaultForComercioId(comercioId: string): Promise<ComercioCategoriaEntity>;
    public abstract getListByComercioId(comercioId: string): Promise<Array<ComercioCategoriaEntity>>;
}