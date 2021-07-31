import { Categoria } from "src/categorias/entities/categoria.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, ManyToOne } from "typeorm";

/** Relaciona un item con una categoría, manteniendo el orden del item en esa categoría */
@Entity({ name: 'item_categoria' })
export class ItemCategoria {
    @Column({ type: 'int' })
    orden: number;

    @ManyToOne(() => Item, item => item.itemCategorias, { primary: true, eager: true })
    item: Item;

    @ManyToOne(() => Categoria, categoria => categoria.itemCategorias, { primary: true, eager: true })
    categoria: Categoria;

    constructor(item: Item, categoria: Categoria, orden: number) {
        this.item = item;
        this.categoria = categoria;
        this.orden = orden;
    }
}