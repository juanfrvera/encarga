import { PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseTypeOrmModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
}