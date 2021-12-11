import { Module } from "@nestjs/common";
import { BaseTypeOrmModule } from "src/typeorm/feature/base/base.typeorm.module";

@Module({
    imports: [
        BaseTypeOrmModule
    ],
    exports: [
        BaseTypeOrmModule
    ]
})
export class BaseModule { }