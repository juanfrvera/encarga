import { TransactionProxy } from "src/base/proxy/transaction.proxy";
import { ComercioCategoria } from "./comercio-categoria.entity";

export abstract class ComercioCategoriaStorage {
    public abstract countByComercioId(comercioId: string): Promise<number>;

    public abstract create(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoria>

    public abstract createDefault(
        comercioId: string, categoriaId: string, transaction: TransactionProxy): Promise<ComercioCategoria>;

    public abstract existWithCategoriaIdAndComercioId(categoriaId: string, comercioId: string): Promise<boolean>;
    public abstract getDefaultForComercioId(comercioId: string): Promise<ComercioCategoria>;
    public abstract getListByComercioId(comercioId: string): Promise<Array<ComercioCategoria>>;
}