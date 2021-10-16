import { Base } from "src/base/entities/base.entity";
import { Comercio } from "src/comercios/entities/comercio.entity";
import { ItemCategoria } from "src/item-categoria/entities/item-categoria.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CategoriaDto } from "../dto/categoria.dto";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";

@Entity()
export class Categoria extends Base {
    @Column({ type: 'varchar' })
    nombre: string;

    /** Items que están en esta categoría, junto con el orden de cada uno de estos */
    @OneToMany(() => ItemCategoria, itemCategoria => itemCategoria.categoria)
    itemCategorias: ItemCategoria[];

    @ManyToOne(() => Comercio, comercio => comercio.categorias)
    comercio: Comercio;

    static toDto(e: CreateCategoriaDto & Categoria | Categoria) {
        return {
            id: e.id,
            nombre: e.nombre,
            items: e.itemCategorias && e.itemCategorias.length ?
                e.itemCategorias.map(i => { return { id: i.item.id, orden: i.orden } })
                : undefined
        } as CategoriaDto
    }

    static toListDto(entity: Categoria) {
        return { id: entity.id, nombre: entity.nombre };
    }
}
