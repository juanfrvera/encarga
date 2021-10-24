import { Dto } from "../base/dto";

export class ItemDto extends Dto {
    titulo: string;
    precio?: number;
    descripcion?: string;
    idsCategorias?: string[];
}
