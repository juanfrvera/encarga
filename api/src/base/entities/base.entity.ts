import { PrimaryGeneratedColumn } from "typeorm";
import { BaseListDto } from "../dto/base-list.dto";

export abstract class Base {
    @PrimaryGeneratedColumn('increment')
    id: number;

    toListDto() {
        return { id: this.id } as BaseListDto;
    }
}
