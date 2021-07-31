import { PrimaryGeneratedColumn } from "typeorm";
import { BaseListDto } from "../dto/base-list.dto";
import { BaseDto } from "../dto/base.dto";
import { CreateBaseDto } from "../dto/create-base.dto";

export abstract class Base {
    @PrimaryGeneratedColumn('increment')
    id: number;

    static toDto(e: Base & CreateBaseDto) {
        return { id: e.id } as BaseDto;
    }

    static toListDto(e: Base) {
        return { id: e.id } as BaseListDto;
    }
}
