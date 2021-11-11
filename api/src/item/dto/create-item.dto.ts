export class CreateItemDto {
    titulo: string;
    precio?: number;
    descripcion?: string;
    idsCategorias?: number[];
}
