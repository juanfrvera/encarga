import { BaseFilter } from "../base/base-filter";

export class CategoriaFilter extends BaseFilter {
    /** Si es verdadero, solo se devolveran las vacías, si es falso, no se devolverán las vacías */
    vacias?: boolean;
}