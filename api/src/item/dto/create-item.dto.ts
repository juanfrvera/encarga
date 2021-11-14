export class CreateItemDto {
    titulo: string;
    precio?: number;
    descripcion?: string;
    categoriaIdList?: string[];
}
