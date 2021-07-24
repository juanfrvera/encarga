import { ObjetoSinId } from "./objeto-sin-id";

export interface ItemSinId extends ObjetoSinId {
    titulo: string;
    precio?: number;
    descripcion?: string;
}