import { BaseFilterDto } from "src/base/dto/base-filter.dto";

export class CategoriaFilter extends BaseFilterDto {
    /** Si es verdadero, solo se devolveran las vacías, si es falso, no se devolverán las vacías */
    vacias?: boolean;
}