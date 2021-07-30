import { ObjetoConId } from "../objeto-con-id";

export interface IItem extends ObjetoConId {
    titulo: string;
    precio?: number;
    descripcion?: string;
    idsCategorias?: string[];
}
