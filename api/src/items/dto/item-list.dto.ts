import { BaseListDto } from "src/base/dto/base-list.dto";

export class ItemListDto extends BaseListDto {
    titulo: string;
    precio?: number;
    descripcion?: string;
}
