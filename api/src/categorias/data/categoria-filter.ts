import { BaseFilter } from "src/base/data/base-filter";

export class CategoriaFilter extends BaseFilter {
    /** Si es verdadero, solo se devolveran las vacías, si es falso, no se devolverán las vacías */
    vacias?: boolean;
}