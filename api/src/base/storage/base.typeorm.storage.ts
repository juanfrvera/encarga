import { Repository } from "typeorm";
import { TransactionProxy } from "../proxy/transaction.proxy";

export class BaseTypeOrmStorage<Model>{
    constructor(
        protected repository : Repository<Model>
    ){}
    
    public startTransaction<T>(runInTransaction: (entityManager: TransactionProxy) => Promise<T>): Promise<T>{
        return this.repository.manager.transaction(runInTransaction);
    }
}