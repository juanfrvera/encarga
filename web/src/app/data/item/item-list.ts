import { ObjetoConId } from "../objeto-con-id";

export interface ItemList extends ObjetoConId {
    titulo: string;
    precio?: number;
    descripcion?: string;
}
