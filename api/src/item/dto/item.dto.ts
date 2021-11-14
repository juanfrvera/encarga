import { BaseDto } from "src/base/dto/base.dto";

export class ItemDto extends BaseDto {
    titulo: string;
    precio?: number;
    descripcion?: string;
    categoriaIdList?: string[];
}
