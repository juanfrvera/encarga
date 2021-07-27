import { Base } from "src/base/entities/base.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, ManyToOne } from "typeorm";

/** Relaciona un item con una categoría, manteniendo el orden del item en esa categoría */
@Entity()
export class ItemCategoria extends Base {
    @Column({ type: 'int' })
    orden: number;

    @ManyToOne(() => Item, item => item.itemCategorias)
    item: Item;

    @ManyToOne(() => Categoria, categoria => categoria.itemCategorias)
    categoria: Categoria;
}