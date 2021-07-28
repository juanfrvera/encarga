import { Base } from "src/base/entities/base.entity";
import { ItemCategoria } from "src/data/entities/item-categoria.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CategoriaListDto } from "../dto/categoria-list.dto";

@Entity()
export class Categoria extends Base {
    @Column({ type: 'varchar' })
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.categoria)
    itemCategorias: ItemCategoria[];

    toListDto() {
        return { id: this.id, nombre: this.nombre } as CategoriaListDto;
    }
}
