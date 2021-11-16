import { Module } from "@nestjs/common";
import { BaseStorage } from "./storage/base.storage";
import { BaseTypeOrmStorage } from "./storage/base.typeorm.storage";

@Module({
    providers: [
        {provide: BaseStorage, useClass: BaseTypeOrmStorage}
    ],
    exports:[
        BaseStorage
    ]
})
export class BaseModule { }