/** Relaciona un item con una categoría, manteniendo el orden del item en esa categoría */
export class ItemCategoria {
    id: string;
    orden: number;
    itemId: string;
    categoriaId: string;

    constructor(id: string, itemId: string, categoriaId: string, orden: number) {
        this.id = id;
        this.itemId = itemId;
        this.categoriaId = categoriaId;
        this.orden = orden;
    }
}