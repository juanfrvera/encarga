import { UpdateCategoriaData } from "../data/update-categoria.data";
import { Categoria } from "../entities/categoria.entity";

export abstract class CategoriaStorage {
    public abstract exists(id: string): Promise<boolean>;
    public abstract isFromComercio(id: string, comercioId: string): Promise<boolean>;
    public abstract remove(id: string): Promise<void>;
    public abstract update(id: string, data: UpdateCategoriaData): Promise<Categoria>;
}