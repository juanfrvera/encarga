import { UpdateCategoriaData } from "../data/update-categoria.data";
import { Categoria } from "../entities/categoria.entity";

export abstract class CategoriaStorage {
    public abstract update(id: string, data: UpdateCategoriaData): Promise<Categoria>;
}