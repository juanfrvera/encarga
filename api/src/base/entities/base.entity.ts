import { PrimaryGeneratedColumn } from "typeorm";

export abstract class Base {
    @PrimaryGeneratedColumn('increment')
    id: number;
}
