import { ObjetoConId } from "../objeto-con-id";

export interface Item extends ObjetoConId {
    titulo: string;
    precio?: number;
    descripcion?: string;
}
