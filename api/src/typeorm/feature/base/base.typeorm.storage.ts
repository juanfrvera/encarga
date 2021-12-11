import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { TransactionProxy } from "../../../base/proxy/transaction.proxy";

@Injectable()
export class BaseTypeOrmStorage {
    public startTransaction<T>(runInTransaction: (entityManager: TransactionProxy) => Promise<T>): Promise<T> {
        return getConnection().transaction(runInTransaction);
    }
}