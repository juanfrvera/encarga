import { Dto } from "../base/dto";

export class ItemListDto extends Dto {
    titulo: string;
    precio?: number;
    descripcion?: string;
}
