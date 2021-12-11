import { Module } from "@nestjs/common";
import { BaseStorage } from "src/base/storage/base.storage";
import { BaseTypeOrmStorage } from "./base.typeorm.storage";

@Module({
    providers: [
        { provide: BaseStorage, useClass: BaseTypeOrmStorage }
    ],
    exports: [
        BaseStorage
    ]
})
export class BaseTypeOrmModule { }