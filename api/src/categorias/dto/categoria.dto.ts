import { BaseDto } from "src/base/dto/base.dto";

export class CategoriaDto extends BaseDto {
    nombre: string;
    items?: { id: number, orden: number }[];
}
