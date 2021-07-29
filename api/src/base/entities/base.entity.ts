import { PrimaryGeneratedColumn } from "typeorm";
import { BaseListDto } from "../dto/base-list.dto";
import { BaseDto } from "../dto/base.dto";

export abstract class Base {
    @PrimaryGeneratedColumn('increment')
    id: number;

    toDto() {
        return { id: this.id } as BaseDto;
    }

    toListDto() {
        return { id: this.id } as BaseListDto;
    }
}
