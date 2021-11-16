import { TransactionProxy } from "../proxy/transaction.proxy";

export abstract class BaseStorage{
    public abstract startTransaction<T>(runInTransaction: (entityManager: TransactionProxy) => Promise<T>)
    : Promise<T>;
}