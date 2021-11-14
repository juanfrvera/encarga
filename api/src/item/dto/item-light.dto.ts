import { BaseLightDto } from "src/base/dto/base-light.dto";

export class ItemLightDto extends BaseLightDto {
    titulo: string;
    precio?: number;
    descripcion?: string;
}
