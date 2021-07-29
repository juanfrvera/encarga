import { Base } from "src/base/entities/base.entity";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CategoriaListDto } from "../dto/categoria-list.dto";
import { CategoriaDto } from "../dto/categoria.dto";

@Entity()
export class Categoria extends Base {
    @Column({ type: 'varchar' })
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.categoria)
    itemCategorias: ItemCategoria[];

    toDto(): CategoriaDto {
        return {
            id: this.id,
            nombre: this.nombre,
            items: this.itemCategorias?.map(i => {
                return { id: i.item.id, orden: i.orden } as { id: number, orden: number };
            })
        };
    }

    toListDto(): CategoriaListDto {
        return { id: this.id, nombre: this.nombre };
    }
}
